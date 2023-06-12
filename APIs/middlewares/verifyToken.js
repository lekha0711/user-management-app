const jwt=require("jsonwebtoken")
require('dotenv').config()
//write a middleware func to verify token
const verifyToken=(request,response,next)=>{
   //get bearer token from req.headers
   const bearerToken=request.headers.authorization//bearer token
   //if bearer token not found
   if(bearerToken===undefined){
    response.send({message:"Unauthorized access...plz login first"})
   }
   //if token is existed
   else{
    //get token from bearerToken
    const token=bearerToken.split(" ")[1]//["bearer",token]
    //verify token
    try{
    jwt.verify(token,process.env.SECRET_KEY)
    //calling next middleware
    next()
    }
    catch(err){
        //forward error to err handling middleware
        next(new Error("Session expired"))
    }
   }
    
}
module.exports=verifyToken