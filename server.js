const compression = require('compression')
const datDnsMiddleware = require('dat-dns-middleware')
const express = require('express')
const sapper = require('sapper')
const serveStatic = require('serve-static')
const app = express()

const { PORT = 4002 } = process.env
const STATIC = 'assets'

// this allows us to do e.g. `fetch('/_api/blog')` on the server
const fetch = require('node-fetch')
global.fetch = (url, opts) => {
  if (url[0] === '/') url = `http://localhost:${PORT}${url}`
  return fetch(url, opts)
}

app.use(compression({ threshold: 0 }))

app.use(datDnsMiddleware(STATIC))
app.use(serveStatic(STATIC, {
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'public,max-age=600')
  }
}))

app.use('/report.html', express.static('.sapper/client/report.html'))
app.use('/stats.json', express.static('.sapper/client/stats.json'))

app.use(sapper())

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
