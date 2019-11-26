const express = require('express');
const router = express.Router({mergeParams: true});
const {util, status, message} = require('../../modules/utils');
const Blog = require('../../models/Blog');
const { ParameterError } = require('../../errors');

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
    Blog.readByIdx(blogIdx)
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

router.put('/:blogIdx', (req, res) => {
    const { blogIdx } = req.params;
    const json = req.body;
    if(!blogIdx || Object.keys(json).length == 0) throw new ParameterError();
    Blog.update(blogIdx, json)
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

router.delete('/:blogIdx', (req, res) => {
    const { blogIdx } = req.params;
    if(!blogIdx) throw new ParameterError();
    Blog.delete(blogIdx)
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
