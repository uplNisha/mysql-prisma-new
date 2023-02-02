
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
module.exports = {
    createsubject: (req) => {
        return new Promise(async (resolve, reject) => {
            try {

                const Data = await prisma.subject.create({
                    data: {
                        subject_name:req.body.subject_name,
                        book_name:req.body.book_name,
                        stream_id:req.body.stream_id

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
                console.log(error,"err")
            
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
    getsubject: (req) => {
        return new Promise(async (resolve, reject) => {
            try {

                const all = await prisma.subject.findMany({})

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
    getupadatecls: (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const update = await prisma.class.update({
                    where: { id: Number(req.params.id) },
                    data: { classTeacherName: req.body.classTeacherName }
                })
                if (update) {
                    return resolve({
                        status: 200,
                        error: false,
                        result: update,
                        code: "DATA_FOUND",
                        message: "DATA_UPDATED",
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
                console.log("User[006] error", err);
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
