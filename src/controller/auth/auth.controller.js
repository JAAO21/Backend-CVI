const controller = {};
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const MessageError = require('../../messages/messageError.js')


const generateAccesToken = (username, _id) => {
    const auth = { username, _id };
    console.log(auth);
    var token = jwt.sign(auth, process.env.JWT_APIKEY, { expiresIn: '1d' });
    return token
}



controller.SignUp = (req, res) => {

    const { name_user,
        password,
        email,
        firstName,
        firstLastName,
        secondName,
        secondLastName,
        identificationType,
        identificationNumber,
        age,
        gender
    } = req.body;
    if (name_user && password) {
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {

                req.getConnection((err, conn) => {
                    if (err) MessageError(res, 'error server on bd', 500)
                    conn.query('select * from user where name_user =?', name_user, (err, row) => {
                        if (err) MessageError(res, err, 400);
                        if (row.length > 0) {
                            MessageError(res, 'this user already exist', 200);
                        } else {
                            const person_data = {
                                firstName,
                                firstLastName,
                                secondName,
                                secondLastName,
                                identificationType,
                                identificationNumber,
                                age,
                                gender
                            }
                            conn.query('insert into person set?', person_data, (err, row) => {
                                if (err) console.log(err)
                                //personID = row.insertId;
                                const user_data = { email, name_user, password: hash, state_user: true, personID: row.insertId }

                                conn.query('insert into user set?', user_data, (err, row) => {
                                    if (err) console.log(err)
                                    console.log(row)
                                })
                            })

                            res.json({
                                message: 'user created',
                                status: true,

                            })
                        }

                    })
                });


            })
        })
    } else {
        MessageError(res, "Content cannote name_user empyt", 400)
    }
}

controller.SignIn = (req, res) => {
    const { name_user, password } = req.body;
    console.log(name_user,password)
    req.getConnection((err, conn) => {
        if (err) MessageError(res, 'error server on bd', 500)
        conn.query('select * from user where name_user =?', name_user, (err, row) => {
            if (err) MessageError(res, err, 400)
            if (row.length > 0) {
                const accesToken = generateAccesToken(name_user, row[0].id);
                 bcrypt.compare(password, row[0].password, function (err, result) {
                    res.header('authorization', accesToken).json({
                        message: 'autenticated user',
                        token: accesToken
                    })
                }); 
            } else {
                MessageError(res, 'user does not exist', 400)
            }
        })
    })

}



module.exports = controller;