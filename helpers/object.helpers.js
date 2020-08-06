const isEmpty = (object = {}) => JSON.stringify(object) === JSON.stringify({})

module.exports = { isEmpty }