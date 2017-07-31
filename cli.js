const program = require('commander')
const sinaStock = require('./index')

program
  .version('0.0.1')
  .parse(process.argv);

const codes = process.argv.slice(2)

sinaStock.stock(codes, (err, stockInfo) => {
  console.log(stockInfo)
})