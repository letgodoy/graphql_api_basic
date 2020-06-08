
export const compose = (...functions) => (args) =>  functions.reduceRight((arg, fn) => fn(arg), args)
// eslint-disable-next-line no-irregular-whitespace
//faz composicao de funcoes. como funciona exatamente... ¯\_( ͡• ᴗ ͡•)_/¯