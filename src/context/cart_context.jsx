import { createContext,useContext, useEffect, useReducer } from "react";
import reducer from '../reducer/cartReducer';
import { type } from "@testing-library/user-event/dist/type";

const CartContext = createContext();

const getLocalCartData = () => {

    let localCartData = localStorage.getItem("eCart");
   // if(localCartData === []){
   //     return [];
   // }else{
   //     return JSON.parse(localCartData);
   // }
   const parsedData = JSON.parse(localCartData);
   if(!Array.isArray(parsedData)) return[];
   return parsedData;
};
const initialState = {
  //cart: [],
  cart:getLocalCartData(),
  total_item:"",
  total_price:"",
  shipping_fee:50000,

};

const CartProvider = ({children}) => {

    const [state,dispatch] = useReducer(reducer,initialState);

    const addToCart = (id,color,amount,product) => {
        dispatch({type: "ADD_TO_CART", payload:{id,color,amount,product} });
    };

    //Increment and decrement products in the cart page
    const setDecrease = (id) => {
        dispatch({type: "SET_DECREMENT", payload: id});
    };

    const setIncrement = (id) => {
        dispatch({type: "SET_INCREMENT", payload: id});
    };

    //removing individual item from cart
    const removeItem = (id) => {
       dispatch({type:"REMOVE_ITEM", payload: id })
    };
    


    //Clearing the cart
    const clearCart = () => {
       dispatch({type: "CLEAR_CART"});
    };

     // Adding the data in the local storage

     useEffect(() => {
        dispatch({type:"CART_TOTAL_ITEM"});
        dispatch({type:"CART_TOTAL_PRICE"});
          localStorage.setItem("eCart",JSON.stringify(state.cart))

     }, [state.cart]);

     return <CartContext.Provider value={{...state,addToCart,removeItem,clearCart,
     setDecrease,
     setIncrement,
     }}>
        {children}
     </CartContext.Provider>;
};

const useCartContext = () => {
    return useContext(CartContext);
}

export {CartProvider,useCartContext};