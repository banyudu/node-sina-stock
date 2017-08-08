'use strict'

const request = require('request')
const iconv = require('iconv-lite')

const SinaStock = {}

module.exports = SinaStock

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
  request({
    url,
    encoding: null,
  }, (err, response, body) => {
    body = iconv.decode(body, 'gb2312')
    body = body.split('\n').filter(e => !/^\s*$/.test(e)) || []
    const result = body.map(line => line2Object(line))
    callback(err, result)
  })
}