const controller = {};
const MessageError = require('../../messages/messageError.js')

controller.create = (req, res) => {
    const { firstName,
        firstLastName,
        secondName,
        secondLastName,
        nationality,
        identificationType,
        identificationNumber,
        birthDate,
        age,
        gender,
        type_seller,
        location_seller,
        name_user,
        product,
        email,
        address,
        stateCivil,
        stratum,
        forcedDisplacement,
        etnia,
        guard,
        eps,
        disability,
        educativeLevel,
        tecnologyAcces,
        publicsServices,
        familyNucleus,
        numberFamilyNucleus } = req.body;

    req.getConnection((err, conn) => {
        if (err) MessageError(res, 'error server on bd', 500)
        conn.query('select * from seller where identificationNumber =?', identificationNumber, (err, row) => {
            if (err) return console.log(err)

            if (row.length > 0) {
                res.json({
                    message: 'Number of identifation duplicated',
                    status: false
                })
            } else {

                if (err) MessageError(res, 'error server on bd', 500)
                conn.query('select * from user where name_user =?', name_user, (err, row) => {
                    if (err) MessageError(res, err, 400)
                    if (row.length > 0) {
                        const userID = row[0].id;
                        const seller_data = {
                            firstName,
                            firstLastName,
                            secondName,
                            secondLastName,
                            nationality,
                            identificationType,
                            identificationNumber,
                            birthDate,
                            age,
                            gender,
                            type_seller,
                            location_seller,
                            userID,
                            product,
                            email,
                            address,
                            stateCivil,
                            stratum,
                            forcedDisplacement,
                            etnia,
                            guard,
                            eps,
                            disability,
                            educativeLevel,
                            tecnologyAcces,
                            publicsServices,
                            familyNucleus,
                            numberFamilyNucleus
                        }
                        conn.query('insert into seller set?', seller_data, (err, row) => {
                            if (err) console.log(err)

                            res.json({
                                message: 'seller created',
                                status: true,
                            })
                        })
                    }


                })

            }

        })
    });

}


controller.findNumberIdentificationSeller = (req, res) => {
    const { identificationNumber } = req.query;
    if (identificationNumber) {
        req.getConnection((err, conn) => {
            if (err) MessageError(res, 'error server on bd', 500)
            conn.query('select * from seller where identificationNumber =?', identificationNumber, (err, row) => {
                if (err) MessageError(res, err, 400)

                res.json({
                    sellers: row
                })
                return row
            })
        });
    } else {
        MessageError(res, "Content cannote identificationNumber empyt", 400)
    }
}



controller.allSellers = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) MessageError(res, 'error server on bd', 500)
        conn.query('select * from seller where state = true', (err, row) => {
            if (err) MessageError(res, err, 400)

            res.json({
                sellers: row
            })
            return row
        })
    });

}

controller.updateSellers = (req, res) => {
    let id = req.params.id;
    let updateData = req.body;

    req.getConnection((err, conn) => {
        if (err) MessageError(res, 'error server on bd', 500)
        let sql = `UPDATE seller SET ? WHERE id=?`;
        conn.query('select * from seller where identificationNumber =? and id!=?', [req.body.identificationNumber, id], (err, row) => {
            if (err) console.log(err)
            if (row.length == 0) {
                conn.query(sql, [updateData, id], (err, row) => {
                    if (err) console.log(err)
                    res.json({
                        sellers: row,
                        state: true
                    })
                })
            }
            res.json({
                message: 'This seller have identificationNumber in use',
                state: false
            })
        })

    });

}


controller.updateStateSellers = (req, res) => {
    const { id } = req.body;
    const { state } = req.body;
    req.getConnection((err, conn) => {
        if (err) MessageError(res, 'error server on bd', 500)
        let sql = `UPDATE seller SET state=? WHERE id=?`;
        conn.query(sql, [state, id], (err, row) => {
            if (err) MessageError(res, err, 400)
            res.json({
                sellers: row,
                state: true
            })
        })

    });

}

module.exports = controller;