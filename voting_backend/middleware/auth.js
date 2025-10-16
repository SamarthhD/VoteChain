const jwt=require('jsonwebtoken')
const auth=(req,res,next)=>{
    const token=req.headers['x-access-token'];
    if(!token){
        res.status(500).json({message:"authentication failed"});
    }
    const decoded=jwt.verify(token,'secretKey');
    console.log(decoded);
    req.accountAddress=decoded.accountAddress//decode the token
    next();
    
}
module.exports=auth;