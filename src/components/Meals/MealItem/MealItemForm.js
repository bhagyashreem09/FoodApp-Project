import { useRef, useState} from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

function MealItemForm (props) {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();
    
    function submitHandler(event) {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;  // this value is always of type string
        const enteredAmountNumber = +enteredAmount; //converting it into number

        if (
            enteredAmount.trim().length === 0 || 
            enteredAmountNumber < 1 || 
            enteredAmountNumber > 5
        ) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    }

    return (
        <form className={classes.form} onSubmit={submitHandler} >
            <Input 
                ref = {amountInputRef}
                label="Amount" 
                input={{
                    id: 'amount_' + props.id,                // `${Math.random()}`,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }} 
            />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5 items)</p>}
        </form>
    )
}

export default MealItemForm;