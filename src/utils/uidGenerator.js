const nanoid = require('nanoid')

module.exports.generate = async function (
  length = 16,
  alphabet = '1234567890abcdef'
) {
  return await nanoid.customAlphabet(alphabet, length)()
}
