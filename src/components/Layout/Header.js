import { Fragment } from "react/cjs/react.production.min";

import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from "./HeaderCartButton";

function Header(props) {
    
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>React Meals</h1>
                <HeaderCartButton onClick={props.onShowCart} />
            </header>

            <div className = {classes['main-image']} >            {/* Since there is "-" in the class name, classes.something will not work */}
                <img src={mealsImage} alt="Meals"/>
            </div>
        </Fragment>
    )
}

export default Header;