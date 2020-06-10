import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = props => {

   const transformedIngredients = Object.keys(props.ingredients)
      .map(ingKey => [...Array(props.ingredients[ingKey])]
         .map((_, index) => <BurgerIngredient key={ingKey+index} type={ingKey}/>));

   return (
      <div className={classes.Burger}>
         <BurgerIngredient type="bread-top"/>
         {transformedIngredients}
         <BurgerIngredient type="bread-bottom"/>
      </div>
   );

};

export default Burger;
