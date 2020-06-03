// module.exports = function compose(...funcs) {
//   if (funcs.length === 0) {
//     // if no functions return the identity
//     return (o) => {
//       return o
//     }
//   }

//   if (funcs.length === 1) {
//     return funcs[0]
//   }

//   const last = funcs[funcs.length - 1]

//   return (f) => {
//     let result = last(f)
//     for (let index = funcs.length - 2; index >= 0; index--) {
//       const fn = funcs[index]
//       result = fn(result)
//     }
//     return result
//   }
// }

const compose = (...functions) => (args) => {
  return functions.reduceRight((arg, fn) => fn(arg), args)
}
module.exports = compose
