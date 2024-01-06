const jwt = require('jsonwebtoken');

const validateToken=(req,res,next)=>{
    const accessToken =req.headers['authorization'] || req.query.accessToken;
    const [bearer,token]=accessToken.split(' ');
    
    if(!accessToken) res.send('Denied Acces')
    jwt.verify(token,process.env.JWT_APIKEY,(err,user)=>{
        if(err){
            res.json({
                message:'Denied Acces, token expired or incorrect',
                err
            })
        }else{
            req.user=user;
            next();
        }
    })
}

module.exports=validateToken;