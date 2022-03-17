import { useReducer } from "react";

import CartContext from "./cart-context";


const defaultCartState = {
    items : [],
    totalAmount : 0
}

function cartReducer(state, action) {
    if (action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(
            item => (item.id === action.item.id)
            );  //will find index of an item in an array

        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items : updatedItems,
            totalAmount : updatedTotalAmount
        }
    }

    if (action.type === 'REMOVE') {

        const existingCartItemIndex = state.items.findIndex(
            (item) => (item.id === action.id)
        );
        const existingItem = state.items[existingCartItemIndex];   
        const updatedTotalAmount = state.totalAmount - existingItem.price;   // subtracting the item price from total amount
        
        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id); //all items where the id is not equal to action id are kept. And the one item, where item id is equal to action id(which is to be removed) is removed from the newly generated array. rest is kept. 
        } else {  // if amount geater than 1, then we don't want to remove the item from the array, we just want to update the amount
            const updatedItem = {...existingItem, amount: existingItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (action.type === 'CLEAR') {
        return defaultCartState;
    }

    return defaultCartState;
}

function CartProvider(props) {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    function addItemToCartHandler (item) {
        dispatchCartAction({type : 'ADD', item : item})      // dispatching action (then handling in cart reducer)
    }

    function removeItemFromCartHandler (id) {
        dispatchCartAction({type : 'REMOVE', id : id})       // dispatching action
    }

    function clearCartHandler () {
        dispatchCartAction({type : 'CLEAR'});
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart : clearCartHandler
    };

    return (

        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>

    )
}

export default CartProvider;