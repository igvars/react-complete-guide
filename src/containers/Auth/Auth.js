import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from "../../shared/utility";


class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail',
        },
        value: '',
        validation: {
          required: { value: true, message: 'Is required' },
          isEmail: {value: true, message: 'Isn\'t proper E-Mail'}
        },
        valid: false,
        touched: false,
        errors: [],
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: { value: true, message: 'Is required' },
          minLength: { value: 6, message: 'Should be more then 5' }
        },
        valid: false,
        touched: false,
        errors: [],
      },
    },
    isSignup: true
  };

  authHandler = (event) => {
    event.preventDefault();
    this.props.onAuth({
      email: this.state.controls.email.value,
      password: this.state.controls.password.value,
      isSignup: this.state.isSignup
    });
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName) => {
    let errors = checkValidity(event.target.value, this.state.controls[controlName].validation);
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        touched: true,
        errors: errors,
        valid: errors.length === 0
      })
    });
    let formIsValid = true;
    for (let key in updatedControls) {
      if (updatedControls.hasOwnProperty(key)) {
        formIsValid = updatedControls[key].valid && formIsValid;
      }
    }
    this.setState({
      controls: updatedControls,
      formIsValid: formIsValid
    });
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup
      };
    });
  };

  render() {
    const formElementsArray = [];

    let form = <Spinner/>;
    if (!this.props.loading) {
      for (let key in this.state.controls) {
        if (this.state.controls.hasOwnProperty(key)) {
          formElementsArray.push({
            id: key,
            config: this.state.controls[key],
          });
        }
      }
      form = formElementsArray.map(item => (
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
      ));
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuth) {
      authRedirect = <Redirect to={this.props.authRedirectPath}/>;
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.authHandler} noValidate>
          {form}
          <Button btnType="Success" disabled={!this.state.formIsValid}>submit</Button>
        </form>
        <Button
          btnType="Danger"
          clicked={this.switchAuthModeHandler}>
          switch to {this.state.isSignup ? 'signin' : 'signup'}</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: data => dispatch(actions.auth(data)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
