import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from "../../UI/Button/Button";

const OrderSummary = props => {

   const ingredients = props.ingredients;

   const ingredientSummary = Object.keys(ingredients).map(ingKey => {
      return (
         <li key={ingKey}>
            <span style={{textTransform: 'capitalize'}}>{ingKey}</span>
            : {ingredients[ingKey]}
         </li>
      );
   });

   return (
      <Aux>
         <h3>Your Order</h3>
         <p>A delicious burger with the following ingredients:</p>
         <ul>
            {ingredientSummary}
         </ul>
         <p><strong>Total price is {props.totalPrice.toFixed(2)}</strong></p>
         <p>Continue to Checkout?</p>
         <Button
            btnType="Danger"
            clicked={props.purchaseCanceled}
         >Cancel</Button>
         <Button
            btnType="Success"
            clicked={props.purchaseContinued}
         >Continue</Button>
      </Aux>);
};

export default OrderSummary;
