const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');
const fs = require("fs");

module.exports = {
    seedDataCreate() {
        return new Promise(async function (resolve, reject) {
            try {
                const adminUser = await prisma.student.findFirst({
                    where: { role: 'admin' }
                })
                console.log(adminUser, "adminUser");
                if (!adminUser) {
                    let randompas = Math.random().toString(36).slice(-8) //for random password
                    let randomtext = Math.random().toString(36).slice(-4) //for random password

                    const salt = await bcrypt.genSalt(12); //generate salt
                    const passwordHash = await bcrypt.hash(randompas, salt);  //Hash password create with salt

                    const Data = await prisma.student.create({
                        //Admin user create
                        data: {
                            student_name: "demo Admin",
                            student_email: `admin${randomtext}@test.com`,
                            role: 'admin',
                            password: passwordHash
                        }
                    })
                    console.log(Data, "Data");


                    //Admin data save in txt file
                    let writeStream = fs.createWriteStream("admin1stTimePassword.txt"); //txt file creation  
                    writeStream.write(`Email: ${Data.student_email}`);
                    writeStream.write(` Password: ${randompas}`);
                    writeStream.end();

                    console.log(`[SeedData 001] Admin login ID: ${Data.student_email} and password: ${randompas}`)
                    resolve(Data)
                } else {
                    console.log(`[SeedData 002] Admin is available in this server`)
                    // reject("Admin is available in this server")
                }

            } catch (err) {
                console.log(err, "<== [SeedData 003] Error in seed data creation");
                // reject(err)
            }

        })

    }
}