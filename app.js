const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const initDb = require('./database');
const initDbM = require('./moongose');

const app = express();



//middlegares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({
    tempFileDir:'/temp'
}))



//init db mysql
initDb(app);

//init db moongose
initDbM(app);

//routes
require('./src/routes/index.js')(app);




module.exports = app;
