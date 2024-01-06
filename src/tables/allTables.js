
const controller={};
controller.TableUser = (req, res) => {
    var tableUser = 'CREATE TABLE user(id int AUTO_INCREMENT primary key,email varchar(100),name_user varchar(100),password varchar(100),state_user boolean,createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,personID int not null)';
    req.getConnection((err, conn) => {
        if (err) MessageError(res, 'error server on bd', 500)
        conn.query(tableUser, (err, row) => {
            if (err) MessageError(res, err, 400)
            
        })
    })

}

controller.TablePerson = (req, res) => {
    var TablePerson = 'CREATE TABLE user( id int AUTO_INCREMENT primary key,firstName varchar(45),firstLastName varchar(45),secondName varchar(45),secondLastName varchar(45),identificationType varchar(45),identificationNumber varchar(45),age int,gender varchar(15))';
    req.getConnection((err, conn) => {
        if (err) MessageError(res, 'error server on bd', 500)
        conn.query(TablePerson, (err, row) => {
            if (err) MessageError(res, err, 400)
            
        })
    })

}


module.exports=controller;
