import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector, useDispatch} from 'react-redux';
import {Fragment, useEffect, useState} from 'react'
import { sendCartData,fetchCartData } from './store/cart-actions';
import Notification from './components/UI/Notification';

//Global var, would only be reinitalized when the file is re rendered rather component
let init = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);
  
  useEffect(()=>{
    dispatch(fetchCartData())
  },[dispatch])

  useEffect(() => {
   
    if(init)
    {
      init = false;
      return;
    }
    if(cart.changed){
      dispatch(sendCartData(cart));
    }
    
  },[cart,dispatch])

  return (
    <>
    {
      notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )
    }
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  </>
  );
}

export default App;
