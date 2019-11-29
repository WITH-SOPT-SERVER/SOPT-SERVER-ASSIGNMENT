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
  
});

router.post('/signin', (req, res) => {
  const {id, pwd} = req.body;
  if(!id || !pwd) throw new ParameterError();
  signin({id, pwd}).then(json => {
    res.status(status.OK)
    .send(util.successTrue(message.X_CREATE_SUCCESS('유저'), json));
  })
  .catch(err => {
    res.status(err.status).send(util.successFalse(err.message));
  })
});

module.exports = router;
