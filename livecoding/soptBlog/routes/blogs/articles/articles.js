const express = require('express');
const router = express.Router({mergeParams: true});
const {util, status, message} = require('../../../modules/utils');
const Article = require('../../../models/Article');
const { ParameterError } = require('../../../errors');

const NAME = '게시글'
router.get('/', async (req, res) => {
    const { blogIdx } = req.params;
    if(!blogIdx) throw new ParameterError();
    // Article.readByBlogIdx(blogIdx)
    Article.readWhere({blogIdx})
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

router.get('/:articleIdx', (req, res) => {
    const { articleIdx } = req.params;
    if(!articleIdx) throw new ParameterError();
    // Article.readByIdx(articleIdx)
    Article.readWhere({articleIdx})
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
    const { blogIdx } = req.params;
    const { title, content } = req.body;
    if(!blogIdx || !title || !content) throw new ParameterError();
    Article.create({blogIdx, title, content})
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

router.put('/:articleIdx', (req, res) => {
    const { articleIdx } = req.params;
    const json = req.body;
    if(!articleIdx || Object.keys(json).length == 0) throw new ParameterError();
    Article.update(articleIdx, json)
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

router.delete('/:articleIdx', (req, res) => {
    const { articleIdx } = req.params;
    if(!articleIdx) throw new ParameterError();
    Article.delete(articleIdx)
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
