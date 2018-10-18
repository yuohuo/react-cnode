/**
 * express-http-proxy alternative
 * proxy URL to CNODE API
 */

const axios = require('axios');
const querystring = require('query-string');

const baseUrl = 'https://cnodejs.org/api/v1'

module.exports = (req, res) => {
  const { path } = req
  const user = req.session.user || {}
  console.log(user);
  const { needAccessToken } = req.query

  // if query URL need token to access and user is already login
  if (needAccessToken && !user.accessToken) {
    console.log(user.accessToken);
    res.status(401).send({
      success: false,
      msg: 'need login'
    })
  }

  const query = Object.assign({}, req.query, {
    accesstoken: (needAccessToken && req.method === 'GET') ? user.accessToken : ''
  })
  if (query.needAccessToken) delete query.needAccessToken

  axios(`${baseUrl}${path}`, {
    method: req.method,
    param: query,
    // covert from JSON to form data
    // {'accesstoken': 'xxx'}  --> 'accesstoken = xxx'
    data: querystring.stringify(Object.assign({}, req.body, {
      accesstoken: (needAccessToken && req.method === 'POST') ? user.accessToken : ''
    })),
    // let request body use form data instead of JSON
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((resp) => {
    if (resp.status === 200) {
      res.send(resp.data)
    } else {
      res.status(resp.status).send(resp.data)
    }
  }).catch((err) => {
    if (err.response) {
      res.status(500).send(err.response.data)
    } else {
      res.status(500).send({
        success: false,
        msg: 'unknown error'
      })
    }
  })
};
