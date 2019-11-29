const express = require('express');
const router = express.Router();
const {
  util,
  status,
  message
} = require('../../modules/utils');
const { ParameterError } = require('../../errors');
const { signin, signup } = require('./services');

router.post('/signup', (req, res) => {
  const {id, password, email, phone, name} = req.body;
  if(!id || !password || !email || !phone || !name) throw new ParameterError();
  signup({id, password, name, email, phone}).then(json => {
    res.status(status.OK)
    .send(util.successTrue(message.X_CREATE_SUCCESS('유저'), json));
  })
  .catch(err => {
    res.status(err.status).send(util.successFalse(err.message));
  })
});

router.post('/signin', (req, res) => {
  const {id, password} = req.body;
  if(!id || !password) throw new ParameterError();
  signin({id, password}).then(json => {
    res.status(status.OK)
    .send(util.successTrue(message.X_READ_SUCCESS('유저'), json));
  })
  .catch(err => {
    res.status(err.status).send(util.successFalse(err.message));
  })
});

module.exports = router;
