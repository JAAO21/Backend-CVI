const app = require('./app.js');

app.listen(process.env.PORT || 3800, () => {
    console.log(`App listening on htpp://${process.env.HOST}:${process.env.PORT}/${process.env.APP_NAME} `);
});

