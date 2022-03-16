import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

function Cart (props) {
    const [isCheckout, setIsCheckout] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `₹ ${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.lenght > 0;

    function cartItemAddHandler (item) {
        cartCtx.addItem(item);
    }

    function cartItemRemoveHandler (id) {
        cartCtx.removeItem(id);
    }

    function orderHandler() {
        setIsCheckout(true);
    }

    const cartItems = ( <div className= {classes['cart-item'] }> 
        {cartCtx.items.map((item) => (
            <CartItem 
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onAdd={cartItemAddHandler.bind(null, item)}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
            />
        )) 
        } </div> );
    
    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout />}
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}> Close </button>
                {!hasItems && <button onClick={orderHandler} className={classes.button}> Order </button>}
            </div>
        </Modal>
    )
}

export default Cart;