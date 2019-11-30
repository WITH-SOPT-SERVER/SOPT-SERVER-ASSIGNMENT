const express = require('express');
const router = express.Router({mergeParams: true});
const { ParameterError } = require('../../../../errors');
const Comment = require('../../../../models/Comment');
const {util, status, message} = require('../../../../modules/utils');
const AuthUtil = require('../../../../modules/auth/authUtils');

const NAME = '댓글'
router.get('/', async (req, res) => {
    const { articleIdx } = req.params;
    if(!articleIdx) throw new ParameterError();
    // Comment.readByArticleIdx(articleIdx)
    Comment.readWhere({articleIdx})
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

router.get('/:commentIdx', (req, res) => {
    const { commentIdx } = req.params;
    if(!commentIdx) throw new ParameterError();
    // Comment.readByIdx(commentIdx)
    Comment.readWhere({commentIdx})
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
    const { articleIdx } = req.params;
    const {  writer, content } = req.body;
    if(!articleIdx || !writer || !content) throw new ParameterError();
    Comment.create({articleIdx, writer, content})
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

router.put('/:commentIdx', AuthUtil.LoggedIn, (req, res) => {
    const { commentIdx } = req.params;
    const json = req.body;
    if(!commentIdx || Object.keys(json).length == 0) throw new ParameterError();
    Comment.update(commentIdx, json)
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

router.delete('/:commentIdx', AuthUtil.LoggedIn, (req, res) => {
    const { commentIdx } = req.params;
    if(!commentIdx) throw new ParameterError();
    Comment.delete(commentIdx)
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
