export interface Product {
  id: number
  name: string
  price: number
  currency: string
}

export interface ProductsResponse {
  requestId: string
  products: Product[]
}

export interface ProductsCheckout {
  quantity: number
  product: Product
}

export interface CheckoutProductsStateProvider  {
  checkoutProducts : ProductsCheckout[] 
} 

export interface CheckoutProductsDispatchProvider {
  updateCheckoutProducts : (checkoutProduct : ProductsCheckout) => void
}

export interface CheckoutProductsContextProps extends CheckoutProductsStateProvider,CheckoutProductsDispatchProvider{}

export interface Payment {
  requestId: string
  paymentInfo: {
    email: string
    cardInfo: {
      cardNo: string
      cardExpiryDate: string
      cardCVV: string
    }
  }
  products: PaymentProduct[]
}

export interface PaymentProduct {
  id: number
  quantity: number
}

export interface CreditCardValues  {
    email: string,
    cardNumber: string,
    cardDate: string,
    cardCvc: string,
    [key: string]: string ;
  }
