const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

let jwtSecretKey = process.env.JWT_SECRET_KEY;

module.exports = {
  verify: async (token) => {
    return new Promise(function (resolve, reject) {
      if (token) {
        jwt.verify(
          token,
          jwtSecretKey,
          async function (err, decoded) {
            console.log(token,"token")
            if (err) {
              reject({
                error: true,
                message: err.message + "err??",
              });
            } else if (!decoded) {
              console.log("Wrong token");
              reject({
                error: true,
                message: "INVALID_TOKEN",
              });
            } else {
              console.log(decoded,"decoded")
              try {
          
                const users = await prisma.student.findFirst({
                  where: { id: decoded.id }
              })
                resolve({ error: false, result: users });
              } catch (err) {
                console.log(err, "error");
                reject({ error: true, message: "INVALID_TOKEN" });
              }
            }
          }
        );
      } else {
        reject({ error: true, message:"AUTHENTICATION_ERROR" });
      }
    })
  }
}

