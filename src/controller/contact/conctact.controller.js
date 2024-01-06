
const nodemailer=require('../../api/nodemailer/nodemailer.js')

const SendMessageNodemailer=async (req,res)=>{
    const {email,name,phone,textData}=req.body;

    const data={
        subject:`Pdf carnet digital de ${name} numero de telefono ${phone}`,
        email,
        message:`<p>${textData}</p>`
    }
   await nodemailer(data)
    res.json({
        message:'Email send',
        state:true
    })
}

module.exports = {SendMessageNodemailer};