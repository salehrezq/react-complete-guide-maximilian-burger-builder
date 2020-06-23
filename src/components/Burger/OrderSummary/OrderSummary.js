import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {

   render() {

      const ingredients = this.props.ingredients;

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
            <p><strong>Total price is {this.props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button
               btnType="Danger"
               clicked={this.props.purchaseCanceled}
            >Cancel</Button>
            <Button
               btnType="Success"
               clicked={this.props.purchaseContinued}
            >Continue</Button>
         </Aux>);
   }
};

export default OrderSummary;
