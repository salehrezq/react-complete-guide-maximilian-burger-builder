import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
   salad: 0.5,
   bacon: 0.7,
   cheese: 0.4,
   meat: 1.3
}

class BurgerBuilder extends Component {

   state = {
      ingredients: {
         salad: 0,
         bacon: 0,
         cheese: 0,
         meat: 0,
      },
      totalPrice: 4
   }

   addIngredientHandler = (type) => {
      this.setState((prevState, props) => {
         return {
            ingredients: {
               ...this.state.ingredients,
               [type]: prevState.ingredients[type] + 1
            },
            totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type]
         };
      });
   }

   render() {
      return (
         <Auxiliary>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls addIngredient={this.addIngredientHandler}/>
         </Auxiliary>
      );
   }
}

export default BurgerBuilder;
