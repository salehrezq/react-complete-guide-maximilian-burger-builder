import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = props => {

   const transformedIngredients = Object.keys(props.ingredients)
      .map(ingKey => [...Array(props.ingredients[ingKey])]
         .map((_, index) => <BurgerIngredient key={ingKey + index} type={ingKey}/>));

   let flattenedTransformedIngredients = transformedIngredients.reduce((accumulator, currentValue) => {
      return accumulator.concat(currentValue);
   }, []);

   if (flattenedTransformedIngredients.length === 0) {
      flattenedTransformedIngredients = <p>Please start adding ingredients.</p>
   }

   return (
      <div className={classes.Burger}>
         <BurgerIngredient type="bread-top"/>
         {flattenedTransformedIngredients}
         <BurgerIngredient type="bread-bottom"/>
      </div>
   );

};

export default Burger;
