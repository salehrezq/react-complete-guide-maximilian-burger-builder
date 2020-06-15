import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

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
      totalPrice: 4,
      purchasable: false,
      purchasing: false
   }

   addIngredientHandler = (type) => {

      const updatedIngredients = {
         ...this.state.ingredients,
         [type]: this.state.ingredients[type] + 1
      }

      this.setState({
         ingredients: updatedIngredients,
         totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type]
      });

      this.updatePurchaseState(updatedIngredients);
   }

   removeIngredientHandler = (type) => {

      const updatedIngredients = {
         ...this.state.ingredients,
         [type]: (this.state.ingredients[type] > 0) ? this.state.ingredients[type] - 1 : 0
      }

      this.setState({
         ingredients: updatedIngredients,
         totalPrice: (this.state.totalPrice > 4) ? this.state.totalPrice - INGREDIENT_PRICES[type] : 4
      });

      this.updatePurchaseState(updatedIngredients);
   }

   updatePurchaseState = (ingredients) => {

      const sum = Object.keys(ingredients).map((ingKey) => {
         return ingredients[ingKey]
      }).reduce(function (sum, ingValue) {
         return sum + ingValue
      }, 0);

      this.setState({purchasable: sum > 0});
   }

   purchaseHandler = () => {
      this.setState({purchasing: true});
   }

   purchaseCancelHandler = () => {
      this.setState({purchasing: false});
   }

   purchaseContinueHandler = () => {
      alert("You continue");
   }

   render() {

      const disabledInfo = {
         ...this.state.ingredients
      }

      for (let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0;
      }

      return (
         <Auxiliary>
            <Modal
               show={this.state.purchasing}
               modalClosed={this.purchaseCancelHandler}>
               <OrderSummary
                  ingredients={this.state.ingredients}
                  purchaseContinued={this.purchaseContinueHandler}
                  purchaseCanceled={this.purchaseCancelHandler}
               />
            </Modal>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls
               addIngredient={this.addIngredientHandler}
               removeIngredient={this.removeIngredientHandler}
               disabled={disabledInfo}
               price={this.state.totalPrice}
               purchasable={this.state.purchasable}
               ordered={this.purchaseHandler}
            />
         </Auxiliary>
      );
   }
}

export default BurgerBuilder;
