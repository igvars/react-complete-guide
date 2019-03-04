export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const checkValidity = (value, rules) => {
  if (Object.entries(rules).length === 0 && rules.constructor === Object) {
    return [];
  }

  let errors = [];
  if (rules.required.value) {
    if (value.trim() === '') {
      errors.push(rules.required.message);
    }
  }

  if (rules.minLength) {
    if (value.length < rules.minLength.value) {
      errors.push(rules.minLength.message);
    }
  }

  if (rules.maxLength) {
    if (value.length > rules.maxLength.value) {
      errors.push(rules.maxLength.message);
    }
  }

  return errors;
};