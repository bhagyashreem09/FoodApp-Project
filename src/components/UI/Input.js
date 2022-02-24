import classes from './Input.module.css';

function Input (props) {

    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}> {props.label} </label>
            <input {...props.input} /> {/* allows to add extra attributes like type, defaultValue */}
        </div>
    )
}

export default Input;