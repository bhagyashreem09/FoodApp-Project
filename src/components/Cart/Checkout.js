import { useState, useRef } from 'react';
import classes from './Checkout.module.css';


const isEmpty = value => value.trim() === '';

const isFiveChars = value => value.trim().length === 6;


function Checkout (props) {

    const [formInputsValidity, setFormInputsValidity] = useState({
        name : true,
        street : true,
        postal : true,
        city : true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();
    
    function confirmHandler(event)  {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;     // storing values
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);   // storing true or false
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalIsValid = isFiveChars(enteredPostal);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setFormInputsValidity({
            name : enteredNameIsValid,
            street : enteredStreetIsValid,
            postal : enteredPostalIsValid,
            city : enteredCityIsValid
        })

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid;

        if (!formIsValid) {
            return;
        } 

        props.onConfirm({
            name: enteredName,
            street : enteredStreet,
            postal : enteredPostal,
            city : enteredCity
        });

  };

  
  return (
    <form className={classes.form} onSubmit={confirmHandler}>

      <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>Enter a valid Name</p>}
      </div>

      <div className={`${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && <p>Enter a valid Street</p>}
      </div>

      <div className={`${classes.control} ${formInputsValidity.postal ? '' : classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef} />
        {!formInputsValidity.postal && <p>Enter a valid Postal Code</p>}
      </div>

      <div className={`${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>Enter a valid City</p>}
      </div>

      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>Cancel</button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;