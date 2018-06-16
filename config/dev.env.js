'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, { //开发
  NODE_ENV: '"development"',
})
