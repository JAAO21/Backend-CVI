module.exports = function (app) {
  app.use('/users', require('./user.routes.js'));
  app.use('/auth', require('./auth.routes.js'));
  app.use('/menu',require('./menu.routes')); 
  app.use('/seller',require('./seller.routes')); 
  app.use('/api/images',require('./images.routes')); 
  app.use('/api/nodemailer',require('./contact.routes')); 
}