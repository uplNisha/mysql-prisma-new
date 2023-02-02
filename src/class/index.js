const express = require('express');

const router = express.Router()
const cls = require('./service');

router.post("/", async (req, res) => {
    cls.createcls(req)
        .then((response) => {
            return res.send({
                response
            });
        })
        .catch((err) => {
            return res.send({
                err
            })
        })
})

router.get('/', async (req, res) => {
    cls.getcls(req)
        .then((response) => {
            return res.send({
                response
            });
        })
        .catch((err) => {
            return res.send({
                err
            })
        })
})
router.put('/:id', async (req, res) => {
    cls.getupadatecls(req)
        .then((response) => {
            return res.send({
                response
            });
        })
        .catch((error) => {
            return res.send({
                error
            })
        })
})

module.exports = router;