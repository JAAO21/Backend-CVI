const controller = {};
const MessageError = require('../../messages/messageError.js')
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) MessageError(res, 'error server on bd', 500)
        conn.query('select * from user', (err, row) => {
            if (err) MessageError(res, err, 400)

            res.json({
                users: row
            })
        })
    });
}

controller.findNameUser = (req, res) => {
    const { name_user } = req.query;
    if (name_user) {
        req.getConnection((err, conn) => {
            if (err) MessageError(res, 'error server on bd', 500)
            conn.query('select * from user where name_user =?', name_user, (err, row) => {
                if (err) MessageError(res, err, 400)

                res.json({
                    users: row
                })
                return row
            })
        });
    } else {
        MessageError(res, "Content cannote name_user empyt", 400)
    }
}

controller.findNameUserAuth = (req, res, name_user) => {
    let find = '';
    if (name_user) {
        req.getConnection((err, conn) => {
            if (err) MessageError(res, 'error server on bd', 500)
            conn.query('select * from user where name_user =?', name_user, (err, row) => {
                if (err) MessageError(res, err, 400);
               
                find= hi(row);
            })
        });
        console.log(find)
        function hi(finduser){
        
           return finduser
            
         }
        return find?find:'salado';
    } else {
        MessageError(res, "Content cannote name_user empyt", 400)
    }
  
}



module.exports = controller;