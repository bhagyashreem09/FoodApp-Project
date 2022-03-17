import Modal from "../UI/Modal";

function OrderConfirmedModal(props) {

    props.orderConfirmed;
    
    return (
        <Modal>
            <h2>Order Confirmed</h2>
            <h3>Happy Ordering</h3>
        </Modal>
    )
}

export default OrderConfirmedModal;