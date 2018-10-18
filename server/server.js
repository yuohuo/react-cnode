const express = require('express')
const reactSSR = require('react-dom/server')
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs')
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

console.log('Initializing server application...')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid',
  resave: false,
  saveUninitialized: false,
  secret: 'react cnode'
}))

app.use('/api/user', require('./util/handleLogin'))
app.use('/api', require('./util/proxy'))

if (!isDev) {
  const serverEntry = require('../dist/server-entry').default //eslint-disable-line
  const template = fs.readFileSync(
    path.join(__dirname, '../dist/index.html'),
    'utf8'
  )
  app.use('/public', express.static(path.join(__dirname, '../dist')))
  app.get('*', (req, res) => {
    const appString = reactSSR.renderToString(serverEntry)
    res.send(template.replace('<!-- app -->', appString))
  })
} else {
  const devStatic = require('./util/dev.static') //eslint-disable-line
  devStatic(app)
}

app.listen(3333, () => {
  console.log('server is listening on port 3333')
})
