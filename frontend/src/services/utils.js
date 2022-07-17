const defaultCartItem = {
  id: null,
  qtd: 1,
  name: null,
  imageUrl: null,
  price: null,
};

export const defaultCurrency = 'USD';

export const currencyFormatter = (value) => new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: defaultCurrency,
}).format(value);

export default defaultCartItem;
