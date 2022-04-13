import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderConfirmedShown, setOrderConfirmedShown] = useState(false);
  const [orderErrorShown, setOrderErrorShown] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `₹ ${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.lenght > 0;

  function cartItemAddHandler(item) {
    cartCtx.addItem(item);
  }

  function cartItemRemoveHandler(id) {
    cartCtx.removeItem(id);
  }

  function orderHandler() {
    setIsCheckout(true);
  }

  function submitOrderHandler(userData) {
    fetch(process.env.REACT_APP_DB_URL_ORDERS, {
      method: "POST",
      body: JSON.stringify({
        customer: userData,
        orderItems: cartCtx.items,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setOrderConfirmedShown(true);
          console.log("Data post successful");
          // props.orderConfirmed(userData.name);
          console.log(userData.name);
        } else {
          console.log("Data sent not successful");
        }
      })
      .catch((error) => {
        setOrderErrorShown(true);
        throw new Error("Oops! Something went wrong. Try again");
      });
    setOrderConfirmedShown(false);
    cartCtx.clearCart();
  }

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        {" "}
        Close{" "}
      </button>
      {!hasItems && (
        <button onClick={orderHandler} className={classes.button}>
          {" "}
          Order{" "}
        </button>
      )}
    </div>
  );

  const cartItems = (
    <div className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}{" "}
    </div>
  );

  return (
    <div>
      {!orderConfirmedShown && (
        <Modal onClose={props.onClose}>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          {isCheckout && (
            <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
          )}
          {!isCheckout && modalActions}
        </Modal>
      )}

      {orderConfirmedShown && (
        <Modal onClose={props.onClose}>
          <h1>Order Confirmed</h1>
          <div className={classes.actions}>
            <button type="button" onClick={props.onClose}>
              OK
            </button>
          </div>
        </Modal>
      )}

      {orderErrorShown && (
        <Modal onClose={props.onClose}>
          <h1>Failed</h1>
          <div className={classes.actions}>
            <button type="button" onClick={props.onClose}>
              OK
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Cart;
