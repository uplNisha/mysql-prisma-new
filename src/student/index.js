const express = require('express');

const router = express.Router()
const student = require('./sevice');
const {verifyToken} = require('../middlewares/verifyToken');
router.post("/", async (req, res) => {
    student.createstudent(req)
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
router.post("/login", async (req, res) => {
    student.login(req)
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

router.get('/:id',verifyToken,async (req, res) => {
    student.getstudent(req)

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
    student.getallstudent(req)
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