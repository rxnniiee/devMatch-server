module.exports = function (object, value) {
  return Object.keys(object).find((key) => object[key] === value)
}
