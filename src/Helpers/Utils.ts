import { ProductsCheckout,Payment,CreditCardValues} from '../Types/Product';

export function getTotalCost(products : ProductsCheckout[]) : number {
  return products?.reduce((total, product) => total + product.product.price * product.quantity, 0) || 0;

}
export function constructPayment(checkoutProducts: ProductsCheckout[], controlledFormValues: CreditCardValues): Payment {
  const paymentProducts = checkoutProducts.map((product: ProductsCheckout) => ({ quantity: product.quantity, id: product.product.id }));
  const payment: Payment = {
    requestId: '12344556',
    paymentInfo: {
      email: controlledFormValues.email.trim(),
      cardInfo: {
        cardNo: controlledFormValues.cardNumber.replace(/-/g, ''),
        cardExpiryDate: controlledFormValues.cardDate.replace('/', ''),
        cardCVV: controlledFormValues.cardCvc
      }
    },
    products: paymentProducts
  };

  return payment;
}