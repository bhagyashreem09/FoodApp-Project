import { useReducer } from "react";

import CartContext from "./cart-context";


const defaultCartState = {
    items : [],
    totalAmount : 0
}

function cartReducer(state, action) {
    if (action.type === 'ADD') {
        const updatedItems = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + action.item.price * action.amount;
        return {
            items : updatedItems,
            totalAmount : updatedTotalAmount
        }
    }
    return defaultCartState;
}

function CartProvider(props) {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    function addItemToCartHandler (item) {
        dispatchCartAction({type : 'ADD', item: item})
    }

    function removeItemFromCartHandler (id) {

    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    return (

        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>

    )
}

export default CartProvider;