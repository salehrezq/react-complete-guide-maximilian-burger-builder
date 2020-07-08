import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

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
      purchasing: false,
      purchaseOrderLoading: false
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
      this.setState({
         purchasing: false,
         purchaseOrderLoading: false
      });
   }

   purchaseContinueHandler = () => {

      this.setState({purchaseOrderLoading: true});

      const order = {
         ingredients: this.state.ingredients,
         // You must not do this in your real application
         // The price must be calculated at the back end.
         price: this.state.totalPrice,
         // Additional dummy data:
         customer: {
            name: 'Saleh Rezq',
            address: {
               street: 'Saglol street',
               city: 'Fayoum',
               country: 'Egypt'
            },
            email: 'test@example.com'
         },
         deliveryMethod: 'fastest'
      }

      // orders is a name you choose,
      // and it is handled by Firebase to store this type of posts
      // .json is a requirement by Firebase
      axios.post('/orders.json', order)
         .then(response => {
            this.setState({
               purchaseOrderLoading: false,
               purchasing: false
            });
            return console.log(response);
         }).catch(error => {
         this.setState({
            purchaseOrderLoading: false,
            purchasing: false
         });
         console.log(error);
      });
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
               {this.state.purchaseOrderLoading ? <Spinner/> : <OrderSummary
                  ingredients={this.state.ingredients}
                  purchaseContinued={this.purchaseContinueHandler}
                  purchaseCanceled={this.purchaseCancelHandler}
                  totalPrice={this.state.totalPrice}
               />}
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

export default WithErrorHandler(BurgerBuilder, axios);
