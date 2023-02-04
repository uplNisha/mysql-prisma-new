const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken')
let jwtSecretKey = process.env.JWT_SECRET_KEY;
let urlAlphabet =
    'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'

let nanoid = (size = 21) => {
    let id = ''
    let i = size
    while (i--) {
        id += urlAlphabet[(Math.random() * 64) | 0]
    }
    return id
}


const prisma = new PrismaClient()
module.exports = {
    createstudent: (req) => {
        return new Promise(async (resolve, reject) => {
            try {

                const Data = await prisma.student.create({
                    data: {
                        classId: req.body.classId,
                        student_name: req.body.student_name,
                        student_email: req.body.student_email,
                        password: nanoid(t = 21),
                        phone_no: req.body.phone_no,
                        gender: req.body.gender,
                        stream_id: req.body.stream_id


                    }

                })
                if (!Data) {
                    return reject({
                        status: 400,
                        error: true,
                        code: "DATA_CREATE_FAILED",
                        message: "DATA_CREATE_FAILED",
                    })
                }
                else {
                    return resolve({
                        status: 201,
                        error: false,
                        result: Data,
                        code: "DATA_CREATED",
                        message: "DATA_CREATED",
                    })
                }

            }
            catch (error) {
                console.log(error, "err");
                return reject({
                    status: 500,
                    error: true,
                    result: error,
                    code: "INTERNAL_SERVER_ERROR",
                    message: "INTERNAL_SERVER_ERROR",
                })
            }
        })
    },
    login: (req) => {
        return new Promise(async function (resolve, reject) {
            try {
                const user = await prisma.student.findMany({
                    where: { student_email: req.body.student_email.toLowerCase() },
                })
                if (!user) {
                    return reject({
                        status: 404,
                        error: true,
                        code: "NO_USER_EXISTS",
                        message: "NO_USER_EXISTS",
                    });
                } else {
                    req.body.password === user.password
                    const payload = {
                        id: user.id
                    };

                    const token = jwt.sign(
                        payload,
                        jwtSecretKey, { expiresIn: 500000 })
                    if (!token) {
                        return reject({
                            status: 501,
                            error: true,
                            code: "INTERNAL_SERVER_ERROR",
                            message: messages["INTERNAL_SERVER_ERROR"],
                        });
                    } else {
                        return resolve({
                            status: 200,
                            token: token,
                            error: false,
                            result: user,
                            code: "LOGIN_SUCCESS",
                            message: "LOGIN_SUCCESS",
                        })
                    };

                }
            } catch (err) {
                console.log(err, "error")
                return reject({
                    status: 500,
                    error: true,
                    result: err,
                    code: "INTERNAL_SERVER_ERROR",
                    message: "INTERNAL_SERVER_ERROR",
                })
            }
        })
    },

    getstudent: (req) => {
        return new Promise(async (resolve, reject) => {
            try {

                const all = await prisma.student.findMany({
                    where: { id: Number(req.params.id) },
                    include: {
                        class: true,
                        stream: {
                            select: { subject: true }
                        }

                    }
                })

                if (all?.length > 0) {
                    return resolve({
                        status: 200,
                        error: false,
                        result: all,
                        code: "DATA_FOUND",
                        message: "DATA_FOUND",
                    })
                } else {
                    return reject({
                        status: 404,
                        error: true,
                        code: "DATA_NOT_FOUND",
                        message: "DATA_NOT_FOUND",
                    })
                }

            } catch (err) {
                console.log(err, "error")
                return reject({
                    status: 500,
                    error: true,
                    result: err,
                    code: "INTERNAL_SERVER_ERROR",
                    message: "INTERNAL_SERVER_ERROR",
                })
            }
        }
        )
    },
    getallstudent: (req) => {
        return new Promise(async (resolve, reject) => {
            try {


                let sortObj = {};
                if (req.query.sort === "name-az") {
                    sortObj.student_name = 'asc'
                } else if (req.query.sort === "name-za") {
                    sortObj.student_name = 'desc';
                } else if (req.query.sort === "id-asc") {
                    sortObj.id = 'asc';
                } else if (req.query.sort === "id-desc") {
                    sortObj.id = 'desc';
                } else if (req.query.sort === "email-az") {
                    sortObj.student_email = 'asc';
                } else if (req.query.sort === "email-za") {
                    sortObj.student_email = 'desc';
                } else {
                    sortObj.created_date = 'desc';
                }

                const all = await prisma.student.findMany({
                    orderBy: sortObj ,
                    include: {
                        class: true,
                        stream: {
                            select: { subject: true }
                        }

                    }
                })

                if (all?.length > 0) {
                    return resolve({
                        status: 200,
                        error: false,
                        result: all,
                        code: "DATA_FOUND",
                        message: "DATA_FOUND",
                    })
                } else {
                    return reject({
                        status: 404,
                        error: true,
                        code: "DATA_NOT_FOUND",
                        message: "DATA_NOT_FOUND",
                    })
                }

            } catch (err) {
                console.log(err, "error")
                return reject({
                    status: 500,
                    error: true,
                    result: err,
                    code: "INTERNAL_SERVER_ERROR",
                    message: "INTERNAL_SERVER_ERROR",
                })
            }
        }
        )
    }
}



