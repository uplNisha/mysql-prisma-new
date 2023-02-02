
const express = require('express');
const cls = require('../class');
const stream = require('../stream');
const subject = require('../subject');
const student = require('../student');

let router = express.Router();


router.use("/stream",stream);
router.use("/class",cls);
router.use("/subject",subject);
router.use("/student",student);
module.exports = router;

