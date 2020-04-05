const carseats = [
  {
    id: 1,
    name: '듀얼픽스 i-SIZE',
    country: '독일',
    price: 1125000,
    isofix: true,
  },
];

exports.list = (ctx) => {
  ctx.body = carseats;
};

exports.detail = (ctx) => {
  const { id } = ctx.params;
  const carseat = carseats.find((c) => c.id.toString() === id);
  if (!carseat) {
    ctx.status = 404;
    ctx.body = {
      message: '존재하지 않습니다.',
    };
    return;
  }
  ctx.body = carseat;
};
