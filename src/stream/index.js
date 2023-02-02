const express = require('express');

const router = express.Router()
const stream = require('./service');

router.post("/", async (req, res) => {
    stream.createstream(req)
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

router.get('/:id', async (req, res) => {
    stream.getstream(req)
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


module.exports = router;