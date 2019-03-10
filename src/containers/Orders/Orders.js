import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders =  <Spinner/>;
    if (!this.props.loading) {
      if (!this.props.orders.length) {
        orders =  <p>Nothing to show!</p>;
      } else {
        orders = this.props.orders.map(item => (
          <Order key={item.id} ingredients={item.ingredients} price={item.price}/>
        ));
      }
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    error: state.order.error,
    token: state.auth.token,
    userId: state.auth.userId
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
