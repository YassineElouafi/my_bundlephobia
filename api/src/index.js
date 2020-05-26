const express = require('express')
const winston = require('winston')
const analyser = require('./package-analyser')

const app = express()
app.set('port', process.env.PORT || 8080);

winston.add(new winston.transports.Console())

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.get('/stats', async (req, res) => {
  try {
    const results = await analyser.getPackageStat(req.query.name, req.query.version)
    if (results) {
      res.json(results)
    } else {
      res.sendStatus(404)
    }
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})

app.get('/history', async (req, res) => {
  try {
    const results = await analyser.getPackageStatHistory(req.query.name)

    if (!results) {
      return res.sendStatus(404)
    }
    return res.json(results)
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})

app.use((error, req, res, next) => {
  winston.error(error)
  if (res.headersSent) {
    return next(error)
  }
  res.sendStatus(500)
})

app.listen(app.get('port'), (error) => {
  if (error) {
      winston.error(`error :${error}`);
  }
});

module.exports.app = app

