import { createContext, useContext } from 'react'
import { CheckoutProductsStateProvider, CheckoutProductsDispatchProvider, CheckoutProductsContextProps } from '../../Types/Product'

const initialCheckoutState: CheckoutProductsStateProvider = {
  checkoutProducts: []
}
const initialCheckoutDispatchState: CheckoutProductsDispatchProvider = {
  updateCheckoutProducts: () => initialCheckoutState
}

const CheckoutProductsState = createContext(initialCheckoutState)
const CheckoutProductsDispatch = createContext(initialCheckoutDispatchState)

export function CheckoutContextStateProvider(props: React.PropsWithChildren<CheckoutProductsContextProps>) {
  const { checkoutProducts, updateCheckoutProducts, children } = props

  return (
    <CheckoutProductsState.Provider value={{ checkoutProducts }}>
      <CheckoutProductsDispatch.Provider value={{ updateCheckoutProducts }}>
        {children}
      </CheckoutProductsDispatch.Provider>
    </CheckoutProductsState.Provider>
  )
}

export function useCheckoutProductsState() {
  const checkoutProductsState = useContext(CheckoutProductsState)
  if (!checkoutProductsState) return

  return checkoutProductsState
}

export function useCheckoutProductsDispatch() {
  const checkoutProductsDispatch = useContext(CheckoutProductsDispatch)
  if (!checkoutProductsDispatch) return

  return checkoutProductsDispatch
}
