const mongoose = require('mongoose');
const dotenv = require('dotenv');


 dotenv.config();
 const initDbM = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.
            connect(`${process.env.DBM_TYPE}://${process.env.DBM_HOST}:${process.env.PORTM_DB}/${process.env.DBM_NAME}`)
            .then(db => console.log("Db is conected moongose", db.connection.name));
    } catch (error) { console.log(error) }
}  

//mongodb+srv://doadmin:0349Itnk2sK67g8l@db-cvi-moongo-701e3fad.mongo.ondigitalocean.com/admin?authSource=admin&tls=true
/*    const initDbM = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.
            connect(`${process.env.DBDO_TYPE}://${process.env.DBDO_USER}:${process.env.DBDO_PASSWORD}@${process.env.DBDO_HOST}/${process.env.DBDO_NAME}?authSource=${process.env.DBDO_NAME}&tls=true`)
            .then(db => console.log("Db is conected moongose",db.connection.name));
    } catch (error) { console.log(error) }
}    */

module.exports = initDbM;