import ProductList from './Components/ProductList/ProductList'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Checkout from './Components/Checkout/Checkout'
import SuccessPage from './Components/SuccessPage/Success'
import { CheckoutContextStateProvider } from './Components/context/context'
import { useState } from 'react'
import { ProductsCheckout } from './Types/Product'
function App() {
  const [checkoutProducts, setCheckoutProducts] = useState<ProductsCheckout[]>([])

  const ProtectedRoute = ({ element, checkoutProducts }: any) => {
    const isEmpty = checkoutProducts.length === 0;
    return isEmpty ? <Navigate to="/" /> : element;
  };

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
              <Route path='/checkout' element={<ProtectedRoute element={<Checkout />} checkoutProducts={checkoutProducts} />} />
              <Route path='/thanks' element={<ProtectedRoute element={<SuccessPage />} checkoutProducts={checkoutProducts} />} />
              <Route path='*' element={<Navigate to="/" />} />
            </Routes>
          </main>
        </Router>
      </CheckoutContextStateProvider>
    </>
  )
}

export default App
