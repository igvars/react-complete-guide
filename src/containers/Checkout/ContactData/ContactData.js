import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from "../../../shared/utility";

import classes from './ContactData.module.css';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: {
          required: { value: true, message: 'Is required' },
        },
        valid: false,
        touched: false,
        errors: [],
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: { value: true, message: 'Is required' },
        },
        valid: false,
        touched: false,
        errors: [],
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code',
        },
        value: '',
        validation: {
          required: { value: true, message: 'Is required' },
          minLength: { value: 2, message: 'Should be more then 1' },
          maxLength: { value: 7, message: 'Should be less then 8' },
        },
        valid: false,
        touched: false,
        errors: [],
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: { value: true, message: 'Is required' },
        },
        valid: false,
        touched: false,
        errors: [],
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail',
        },
        value: '',
        validation: {
          required: { value: true, message: 'Is required' },
        },
        valid: false,
        touched: false,
        errors: [],
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {
              value: 'fastest',
              displayValue: 'Fastest',
            },
            {
              value: 'cheapest',
              displayValue: 'Cheapest',
            },
          ],
        },
        value: 'fastest',
        valid: true,
        validation: {},
      },
    },
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let key in this.state.orderForm) {
      if (this.state.orderForm.hasOwnProperty(key)) {
        formData[key] = this.state.orderForm[key].value;
      }
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
      userId: this.props.userId
    };
    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    let errors = checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation);
    const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
      value: event.target.value,
      valid: errors.length === 0,
      touched: true,
      errors: errors
    });
    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let key in updatedOrderForm) {
      if (updatedOrderForm.hasOwnProperty(key)) {
        formIsValid = updatedOrderForm[key].valid && formIsValid;
      }
    }
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid
    });
  };

  render() {
    const formElementsArray = [];

    for (let key in this.state.orderForm) {
      if (this.state.orderForm.hasOwnProperty(key)) {
        formElementsArray.push({
          id: key,
          config: this.state.orderForm[key],
        });
      }
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(item => (
          <Input
            key={item.id}
            elementType={item.config.elementType}
            elementConfig={item.config.elementConfig}
            value={item.config.value}
            invalid={!item.config.valid}
            shouldValidate={item.config.validation}
            touched={item.config.touched}
            errors={item.config.errors}
            changed={(event) => this.inputChangedHandler(event, item.id)}/>
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>order</Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner/>;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data!</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    error: state.order.error,
    token: state.auth.token,
    userId: state.auth.userId
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (data, token) => dispatch(actions.purchaseBurger(data, token))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
