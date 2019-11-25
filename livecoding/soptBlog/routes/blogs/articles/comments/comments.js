const express = require('express');
const router = express.Router({mergeParams: true});

router.get('/', (req, res) => {
    res.status(200)
    .json({path: req.originalUrl, method: req.method});
});

router.get('/:commentIdx', (req, res) => {
    const { commentIdx } = req.params;
    res.status(200)
    .json({path: req.originalUrl, method: req.method});
});

router.post('/', (req, res) => {
    res.status(200)
    .json({path: req.originalUrl, method: req.method});
});

router.put('/:commentIdx', (req, res) => {
    const { commentIdx } = req.params;
    res.status(200)
    .json({path: req.originalUrl, method: req.method});
});

router.delete('/:commentIdx', (req, res) => {
    const { commentIdx } = req.params;
    res.status(200)
    .json({path: req.originalUrl, method: req.method});
});

module.exports = router;
