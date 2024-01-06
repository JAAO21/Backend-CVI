
const controller = {};
const MessageError = require('../../messages/messageError.js');
controller.Menu = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) MessageError(res, 'error server on bd', 500)
        conn.query('select * from menu ', (err, row) => {
            if (err) MessageError(res, err, 400)
            
            res.json({
                row
            })
        })
    })

}

module.exports=controller;