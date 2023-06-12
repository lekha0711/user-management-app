//create mini express api
const exp=require("express");
const userApp=exp.Router()

const expressAsyncHandler=require("express-async-handler")

const bcryptjs=require("bcryptjs")
//import multerObj
const multerObj=require("./middlewares/cloudinaryConfig")
//json web token
const jwt=require("jsonwebtoken")
require('dotenv').config()
const verifyToken=require("./middlewares/verifyToken")
//body parser
userApp.use(exp.json())

//create user api



//get user by username
//make it as a private route
userApp.get("/get-user/:username",verifyToken,expressAsyncHandler(async(request,response)=>{
    //get userCollectionObj
   const userCollectionObj=request.app.get('userCollectionObj')
   //get username from url
let usernameFromUrl=(request.params.username)
//find user by username
let userOfDB=await userCollectionObj.findOne({username:usernameFromUrl})
//if user is not existed
if(userOfDB===null){
    response.status(201).send({message:"User not found"})
}
//else if user existed
else{
//remove password from userOfDB
delete userOfDB.password
response.status(201).send({message:"User",payload:userOfDB}) 
}
}))

//user login
userApp.post("/user-login",expressAsyncHandler(async(request,response)=>{
    //get collection obj
    const userCollectionObj=request.app.get('userCollectionObj')
    //get user credentials from req
    const userCredObj=request.body
    console.log(userCredObj)
    //verify username
    let userOfDB=await userCollectionObj.findOne({username:userCredObj.username})

    //if username is invalid
    if(userOfDB===null){
        response.status(200).send({message:"invalid username"})
    }
    //if username is valid
    else{
        //verify the password
        /*plain password is received in userOfDB.password so,
        to verify that password with hashed password we need to convert 
        this plain password to hashed password.coz the already hashed passwrod can't be converted into plain password again*/
        let isEqual=await bcryptjs.compare(userCredObj.password,userOfDB.password)//this func will convert the plain password into hashed password and then compares it
        //if password doesn't match
        if(isEqual===false)
        {
            response.status(200).send({message:"invalid password"})
        }
      //if passsword matches
      else{
        //create jwt token
       let jwtToken=jwt.sign({username:userOfDB.username},process.env.SECRET_KEY,{expiresIn:"5m"})  
       /*here in this expiresIn we have to give 
        the time till when the user credentials will be valid
        and it is dependent on the type of application.for example 
        for gmail the validity is for  1 week 
        so when we donot gmail for 1 week it again asks us to login 
        as session is expired.*/  
        
        //send token in response
        delete userOfDB.password
         response.status(200).send({message:"success",token:jwtToken,user:userOfDB})
      }
    }
}))
//private route
userApp.get("/test",verifyToken,(request,res)=>{
    console.log(request.headers)
    res.send({message:"reply from private route"})
})
//create user
//public route any one can register
userApp.post("/user-signup",multerObj.single('photo'),expressAsyncHandler(async(request,response)=>{
    //get userCollectionObj
    const userCollectionObj=request.app.get('userCollectionObj')
    //get new user from request
    const newUser=JSON.parse(request.body.user)//converts string to javascript obj again
    //check for duplicate user by username(by using findOne method in database we can check if the user is already existed or not)
    let userOfDB=await userCollectionObj.findOne({username:newUser.username})

    //if user already existed send rest client as "user already existed"
    if(userOfDB!=null){ // not null so user already existed
        response.status(200).send({message:"user already existed"})
        //console.log(message)
    }
    //if user is not existed:
    else{
        //add CDN link of cloudinary image to user obj
        newUser.image=request.file.path
     //hash the password 
      let hashedPassword=await bcryptjs.hash(newUser.password,5)
      //$2a$05$bkZUEsgh5rTxZ0VIUpprMuE63IapehbKhc0KzRwa.Fyq8RKaziEl2(this is the hashed password of lekha.Once we hash the password we can't get the original password so it can't be hacked)
      //replace the plain password with hashed password 
      newUser.password=hashedPassword
      //insert user
      await userCollectionObj.insertOne(newUser)
      //send response
      response.status(201).send({message:"user created"})
     

    }
       
  }))



module.exports=userApp;