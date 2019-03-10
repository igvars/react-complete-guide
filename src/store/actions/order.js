import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, data) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    payload: {
      id: id,
      data: data
    }
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    payload: {
      error: error
    }
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (data, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json?auth=' + token, data)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, data));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = (data) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    payload: {
      data: data
    }
  }
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    payload: {
      error: error
    }
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('orders.json' + queryParams)
      .then(response => {
        const fetchedData = [];
        for (let key in response.data) {
          if (response.data.hasOwnProperty(key)) {
            fetchedData.push({
              ...response.data[key],
              id: key,
            })
          }
        }
        dispatch(fetchOrdersSuccess(fetchedData));
      })
      .catch(error => {
        dispatch(fetchOrdersFail(error));
      });
  };
};
