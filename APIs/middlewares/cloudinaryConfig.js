const cloudinary=require("cloudinary").v2
const multer=require("multer")
const {CloudinaryStorage}=require("multer-storage-cloudinary")

require('dotenv').config()//process env
//config cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})
//config cloudinary storage
let clStorage=new CloudinaryStorage({
      cloudinary:cloudinary,
      params:{
        folder:"userManagementApp",
        public_id:(request,file)=>file.fieldname+"-"+Date.now()
      } 
})
//configure multer
let multerObj=multer({storage:clStorage})

module.exports=multerObj