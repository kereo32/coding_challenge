import { ProductsCheckout,Payment,CreditCardValues} from '../Types/Product';

export function getTotalCost(products: ProductsCheckout[]): number {
  const totalCost = products.reduce((total, product) => total + product.product.price * product.quantity, 0);
  return parseFloat(totalCost.toFixed(2));
}
export function constructPayment(checkoutProducts: ProductsCheckout[], controlledFormValues: CreditCardValues): Payment {
  const paymentProducts = checkoutProducts.map((product: ProductsCheckout) => ({ quantity: product.quantity, id: product.product.id.toString() }));
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