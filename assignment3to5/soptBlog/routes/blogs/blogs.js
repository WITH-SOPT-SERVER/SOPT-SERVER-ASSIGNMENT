const express = require('express');
const router = express.Router({mergeParams: true});
const { ParameterError, NotMatchedError } = require('../../errors');
const Blog = require('../../models/Blog');
const { util, status, message } = require('../../modules/utils');
const AuthUtil = require('../../modules/auth/authUtils');

const NAME = '블로그'
router.get('/', async (req, res) => {
    Blog.readAll()
    .then(result => {
        res.status(status.OK)
        .send(util.successTrue(message.X_READ_SUCCESS(NAME), result));
    })
    .catch(err => {
        console.log(err);    
        res.status(err.status || 500);
        res.send(util.successFalse(err.message));
    })
});

router.get('/:blogIdx', (req, res) => {
    const { blogIdx } = req.params;
    if(!blogIdx) throw new ParameterError();
    // Blog.readByIdx(blogIdx)
    Blog.readWhere({blogIdx})
    .then(result => {
        res.status(status.OK)
        .send(util.successTrue(message.X_READ_SUCCESS(NAME), result));
    })
    .catch(err => {
        console.log(err);
        res.status(err.status || 500);
        res.send(util.successFalse(err.message));
    });
});

router.post('/', AuthUtil.LoggedIn, (req, res) => {
    const { name, host } = req.body;
    if(!name || !host) throw new ParameterError();
    Blog.create({name, host})
    .then(result => {
        const insertId = result.insertId;
        res.status(status.OK)
        .send(util.successTrue(message.X_CREATE_SUCCESS(NAME), insertId));
    })
    .catch(err => {
        console.log(err);    
        res.status(err.status || 500);
        res.send(util.successFalse(err.message));
    });
});

router.put('/:blogIdx', AuthUtil.LoggedIn, (req, res) => {
    const { blogIdx } = req.params;
    const json = req.body;
    if(!blogIdx || Object.keys(json).length == 0) throw new ParameterError();
    Blog.update(blogIdx, json)
    .then(result => {
        const affectedRows = result.affectedRows;
        if(affectedRows == 0) throw new NotMatchedError();
        res.status(status.OK)
        .send(util.successTrue(message.X_UPDATE_SUCCESS(NAME)));
    })
    .catch(err => {
        console.log(err);    
        res.status(err.status || 500);
        res.send(util.successFalse(err.message));
    });
});

router.delete('/:blogIdx', AuthUtil.LoggedIn, (req, res) => {
    const { blogIdx } = req.params;
    if(!blogIdx) throw new ParameterError();
    Blog.delete(blogIdx)
    .then(result => {
        const affectedRows = result.affectedRows;
        if(affectedRows == 0) throw new NotMatchedError();
        res.status(status.OK)
        .send(util.successTrue(message.X_DELETE_SUCCESS(NAME)));
    })
    .catch(err => {
        console.log(err);    
        res.status(err.status || 500);
        res.send(util.successFalse(err.message));
    });
});

module.exports = router;
