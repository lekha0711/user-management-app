//create express application
const { response, request } = require("express")
const exp=require("express")
const app=exp()
require('dotenv').config()
const port=process.env.PORT||3500
//assign port number
app.listen(port,()=>console.log("web server listening in port 3500..."))
//connect react build
const path=require("path")
app.use(exp.static(path.join(__dirname,'./build')))
// get mongodb client
const mclient=require('mongodb').MongoClient

//connect mongo client to mongodb server
mclient.connect('mongodb://0.0.0.0:27017').then((dbRef)=>{
    //connect to a database
   const dbObj= dbRef.db('sample')
   //connect to collections of sample database
   const userCollectionObj=dbObj.collection('userscollection')
   const productCollectionObj=dbObj.collection('productscollection')
   //share collection to api's
   app.set('userCollectionObj',userCollectionObj)
   app.set('productCollectionObj',productCollectionObj)
   console.log("DB connection success")
})
.catch(err=>console.log("database connection error :",err))


//importing user api and product api
const userApp=require("./APIs/usersapi")
const productApp=require("./APIs/productsapi")

//execute userapi when the path is user-api
app.use('/user-api',userApp)

//execute productsapi when the path is products-api
app.use('/products-api',productApp)

//middleware to deal with page refresh
const pageRefresh=(request,response,next)=>{
    response.sendFile(path.join(__dirname,'./build/index.html'))
}
app.use("/*",pageRefresh)

//invalid path dealing middleware
const invalidPathMiddleware=(request,response,next)=>{
    response.send({message:"invalid path"})
}
app.use("*",invalidPathMiddleware)

//error handling middleware
const errHanhandlingMiddleware=(error,request,response,next)=>{
    response.send({message:error.message})

}
app.use(errHanhandlingMiddleware)


