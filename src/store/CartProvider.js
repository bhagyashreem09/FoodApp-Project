import CartContext from "./cart-context";

function CartProvider(props) {
    function addItemToCartHandler (item) {

    }

    function removeItemFromCartHandler (id) {

    }

    const cartContext = {
        items: [],
        totalAmount: 0,
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