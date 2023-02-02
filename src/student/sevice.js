const { PrismaClient } = require('@prisma/client')

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
                data:{
                 classId: req.body.classId,
                student_name: req.body.student_name,
                student_email: req.body.student_email, 
                password:nanoid(t=21),
                phone_no:req.body.phone_no,
                gender:req.body.gender,
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
            console.log(error,"err");
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
getstudent: (req) => {
    return new Promise(async (resolve, reject) => {
        try {

            const all = await prisma.student.findMany({
                where: { id: Number(req.params.id) },
                 include: {
                    class: true,
                    stream:{select: { subject: true }
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

            const all = await prisma.student.findMany({
                 include: {
                    class: true,
                    stream:{select: { subject: true }
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
}




