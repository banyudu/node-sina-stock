'use strict'

const request = require('request')

const SinaStock = {}

module.exports = SinaStock

// 0：”大秦铁路”，股票名称；
// 1：”27.55″，今日开盘价；
// 2：”27.25″，昨日收盘价；
// 3：”26.91″，当前价格；
// 4：”27.55″，今日最高价；
// 5：”26.20″，今日最低价；
// 30: 2017-08-03 日期
// 31: 11:11:11 时间

function line2Object(line) {
  let result = {}
  const regex = /hq_str_([a-zA-Z0-9]+)="(.*?)"/
  if (regex.test(line)) {
    const matchResult = line.match(regex)
    const code = matchResult[1]
    const data = matchResult[2].split(',')
    result = {
      code: code,
      name: data[0],
      opening: data[1],
      close: data[2],
      current: data[3],
      high: data[4],
      low: data[5],
      date: data[30],
      time: data[31],
    }
  }
  return result
}

SinaStock.stock = (codes, callback) => {
  if (!Array.isArray(codes)) {
    codes = [codes]
  }

  const url = `http://hq.sinajs.cn/list=${codes.join(',')}`
  request(url, (err, response, body) => {
    body = body.split('\n').filter(e => !/^\s*$/.test(e)) || []
    const result = body.map(line => line2Object(line))
    callback(err, result)
  })
}