# node-sina-stock
Sina stock node module

This module provides an api to get stock info from sina finance.

```javascript
const SinaStock = require('sina-stock');

const codes = ['sz000333', 'sh601628']; // 股票代码
SinaStock.stock(codes, (err, data) => {
  console.log(data);
});

// data
[
    {
        code: 'sz000333', // 股票编号
        name: '美的集团', // 股票名称
        opening: '40.980', // 今日开盘价
        close: '40.970', // 昨日收盘价
        current: '41.000', // 当前价
        high: '41.230', // 今日最高价
        low: '40.860', // 今日最低价
        date: '2017-09-08', // 日期
        time: '13:49:06' // 当前时间
    },
    {
        code: 'sh601628',
        name: '中国人寿',
        opening: '28.520',
        close: '28.510',
        current: '28.490',
        high: '28.680',
        low: '28.430',
        date: '2017-09-08',
        time: '13:50:44'
    }
]

```