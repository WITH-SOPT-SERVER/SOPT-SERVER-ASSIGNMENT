const express = require('express');
const router = express.Router({mergeParams: true});
const {util, status, message} = require('../../../../modules/utils');
const Comment = require('../../../../models/Comment');
const { ParameterError } = require('../../../../errors');

const NAME = '댓글'
router.get('/', async (req, res) => {
    const { articleIdx } = req.params;
    if(!articleIdx) throw new ParameterError();
    Comment.readByArticleIdx(articleIdx)
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
    Comment.readByIdx(commentIdx)
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

router.post('/', (req, res) => {
    const { blogIdx: articleIdx, writer, content } = req.body;
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

router.put('/:commentIdx', (req, res) => {
    const { commentIdx } = req.params;
    const json = req.body;
    if(!commentIdx || Object.keys(json).length == 0) throw new ParameterError();
    Comment.update(commentIdx, json)
    .then(result => {
        console.log(result);
        const affectedRows = result.affectedRows;
        res.status(status.OK)
        .send(util.successTrue(message.X_UPDATE_SUCCESS(NAME), {affectedRows}));
    })
    .catch(err => {
        console.log(err);    
        res.status(err.status || 500);
        res.send(util.successFalse(err.message));
    });
});

router.delete('/:commentIdx', (req, res) => {
    const { commentIdx } = req.params;
    if(!commentIdx) throw new ParameterError();
    Comment.delete(commentIdx)
    .then(result => {
        console.log(result);
        const affectedRows = result.affectedRows;
        res.status(status.OK)
        .send(util.successTrue(message.X_DELETE_SUCCESS(NAME), {affectedRows}));
    })
    .catch(err => {
        console.log(err);    
        res.status(err.status || 500);
        res.send(util.successFalse(err.message));
    });
});

module.exports = router;
