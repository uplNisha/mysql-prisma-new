const express = require('express');

const router = express.Router()
const subject = require('./service');

router.post("/", async (req, res) => {
    subject.createsubject(req)
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
    subject.getsubject(req)
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