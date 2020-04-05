const products = [
  {
    id: 1,
    name: '듀얼픽스 i-SIZE',
    country: '독일',
    price: 1125000,
    isofix: true,
  },
];

export const list = (ctx) => {
  ctx.body = products;
};

export const detail = (ctx) => {
  const { id } = ctx.params;
  const product = products.find((p) => p.id.toString() === id);
  if (!product) {
    ctx.status = 404;
    ctx.body = {
      message: '존재하지 않습니다.',
    };
    return;
  }
  ctx.body = product;
};
