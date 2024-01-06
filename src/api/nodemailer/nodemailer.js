
const dotenv = require('dotenv');

const nodemailer = require("nodemailer");
dotenv.config();

// async..await is not allowed in global scope, must use a wrapper
const sendMessage = async (data) => {
    console.log(data)
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
   

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service:'gmail',
        port: 587,
        auth: {
            user: 'jorgeandres2104@gmail.com', // generated ethereal user
            pass: 'pbngbxhfmgjmrafb', // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'jorgeandres2104@gmail.com', // sender address
        to: data.email, // list of receivers
        subject: data.subject, // Subject line
        html: data.message, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}



module.exports = sendMessage;