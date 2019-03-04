import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingredientName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: {
      ingredientName: ingredientName
    }
  }
};

export const removeIngredient = (ingredientName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: {
      ingredientName: ingredientName
    }
  }
};

export const setIngredients = (payload) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: payload.ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios.get('https://react-my-burger-51526.firebaseio.com/ingredients.json')
      .then(response => {
        dispatch(setIngredients({ ingredients: response.data }));
      })
      .catch(() => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
