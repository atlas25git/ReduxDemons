import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice'

export const fetchCartData = () => {
    return async (dispatch) => {
        
        const fetchData = async () => {
           const response = await fetch(
               'https://reduxdemons-default-rtdb.firebaseio.com/cart.json');
        
        if(!response.ok){
            throw new Error('Could not Fetch!');
        }
        const data = await response.json();

        return data;
    };
    try{
        const cartData = await fetchData();
        dispatch(cartActions.replaceCart(
            {
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity,
            }
        ));
    ;}
    catch(error){
        window.alert(error);
        dispatch(
            uiActions.showNotification({
              status: 'error',
              title: 'Error',
              message: 'Fetching Cart Data Failed',
            })
        )
    }
}
}

export const sendCartData = cart => {
    return  async (dispatch) => {
        dispatch(
            uiActions.showNotification({
              status: 'pending',
              title: 'Sending',
              message: 'Sending To Cart',
            })
          );

        const sendRequest = async () => {
        const response = await 
        fetch
          ('https://reduxdemons-default-rtdb.firebaseio.com/cart.json',
          {
              method: 'PUT',
             body: JSON.stringify(
                {
                 items: cart.items,
                 totalQuantity: cart.totalQuantity,
                }
             ),
          }
            );
        if(!response.ok){
          throw new Error('Sending Failed');
        }
        }
        try{
            await sendRequest();
            dispatch(
                uiActions.showNotification({
                  status: 'success',
                  title: 'Success',
                  message: 'Sent To Cart',
                })
              );
        }catch(error){
            dispatch(
                uiActions.showNotification({
                  status: 'error',
                  title: 'Error',
                  message: 'Sending To Cart Failed',
                })
              );
        }

        
    };
};