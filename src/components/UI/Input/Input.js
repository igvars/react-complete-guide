import React from 'react';

import classes from './Input.module.css';

const Input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}/>;
      break;
    case ('textarea'):
      inputElement = <textarea
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}/>;
      break;
    case ('select'):
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}>
          {props.elementConfig.options.map(item => (
            <option key={item.value} value={item.value}>
              {item.displayValue}
            </option>
          ))}
      </select>
      );
      break;
    default:
      inputElement = <input
        className={inputClasses.join(' ')}
         {...props.elementConfig}
         value={props.value}
        onChange={props.changed}/>;
      break;
  }

  let validationError = null;
  if (props.invalid && props.touched) {
    validationError = <div className={classes.ValidationError}>{props.errors.map(item => (
      <p key={item}>{item}</p>
    ))}</div>;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default Input;
