
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
module.exports = {
    createstream: (req) => {
        return new Promise(async (resolve, reject) => {
            try {

                const Data = await prisma.stream.create({
                    data: {
                        stream:req.body.stream

                    },include: {
                        subject: true

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
    getstream: (req) => {
        return new Promise(async (resolve, reject) => {
            try {

                const allcls = await prisma.stream.findMany({
                     where: { id: Number(req.params.id) },
                    include: {
                        subject: true

                    }

                })

                if (allcls?.length > 0) {
                    return resolve({
                        status: 200,
                        error: false,
                        result: allcls,
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
    getallstream: (req) => {
        return new Promise(async (resolve, reject) => {
            try {

                const allcls = await prisma.stream.findMany({
                    include: {
                        subject: true

                    }

                })

                if (allcls?.length > 0) {
                    return resolve({
                        status: 200,
                        error: false,
                        result: allcls,
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
