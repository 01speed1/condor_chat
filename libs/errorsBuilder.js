const required = (errors, fieldKey, value ) => {
  if(!value) {
    const foundError = {}
    foundError[fieldKey] = { ...errors[fieldKey], required: `${fieldKey} is required` }

    return { ...errors, ...foundError }
  }
  return errors
}

const tooShort = (errors, fieldKey, value, minlength = 6 ) => {
  if(value && value.length < minlength) {
    const foundError = {}
    foundError[fieldKey] = { ...errors[fieldKey], tooShort: `${fieldKey} is too short` }

    return { ...errors, ...foundError }
  }
  return errors
}

const equality = (errors, fieldKey, value, validation ) => {
  if(value !== validation) {
    const foundError = {}
    foundError[fieldKey] = { ...errors[fieldKey], equality: `${fieldKey} does not match your validation` }

    return { ...errors, ...foundError }
  }
  return errors
}

module.exports = { required, tooShort, equality }