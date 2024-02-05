import ProductList from './Components/ProductList/ProductList'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Checkout from './Components/Checkout/Checkout'
import SuccessPage from './Components/SuccessPage/Success'
import { CheckoutContextStateProvider } from './Components/context/context'
import { useState } from 'react'
import { ProductsCheckout } from './Types/Product'
function App() {
  const [checkoutProducts, setCheckoutProducts] = useState<ProductsCheckout[]>([])

  function updateCheckoutProducts(checkoutProduct: ProductsCheckout): void {
    setCheckoutProducts((prevState: ProductsCheckout[]) => {
      const existingProductIndex = prevState.findIndex(
        (productInState) => productInState.product.id === checkoutProduct.product.id
      );
      if (checkoutProduct.quantity == 0) {
        const updatedProducts = prevState.filter(
          (productInState) => productInState.product.id !== checkoutProduct.product.id
        );
        return updatedProducts;
      } else if (existingProductIndex !== -1) {
        const updatedProducts = [...prevState];
        updatedProducts[existingProductIndex].quantity = checkoutProduct.quantity;
        return updatedProducts;
      } else {
        return [...prevState, checkoutProduct];
      }
    });
  }

  return (
    <>
      <CheckoutContextStateProvider checkoutProducts={checkoutProducts} updateCheckoutProducts={updateCheckoutProducts}>
        <Router>
          <main className='App'>
            <Routes>
              <Route path='/' element={<ProductList />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/thanks' element={<SuccessPage />} />
            </Routes>
          </main>
        </Router>
      </CheckoutContextStateProvider>
    </>
  )
}

export default App
