//create mini express api
const exp=require("express")
const productApp=exp.Router()
//products api
let pro=[]
//get products
productApp.get("/get-products",(request,response)=>{
    response.send({message:"all products",payload:pro})
})
//get products by id
productApp.get("/get-product/:id",(request,response)=>{
    //get id from url
    let proId=+request.params.id
    let pro1=pro.find(proObj=>proObj.id===proId)
    response.send({message:"One products",payload:pro1})
})
//create products
productApp.post("/create-product",(request,response)=>{
    let newPro=request.body
    pro.push(newPro)
    response.send({message:"product created"})
})
//update products
productApp.put("/update-product",(request,response)=>{
    let modifiedPro=request.body
    let indexOfExistingPro=pro.findIndex(proObj=>proObj.id===modifiedPro.id)
    if(indexOfExistingPro===-1)
    {
        response.send({message:"invalid userId"})
    }
    else{
        pro.splice(indexOfExistingPro,1,modifiedPro)
        //response
        response.send({message:"user updated"})
    }
})
//delete products
productApp.delete("/delete-product/:id",(request,response)=>{
    let proId=+request.params.id
    let indexToRemovePro=pro.findIndex(proObj=>proObj.id===proId)
    if(indexToRemovePro===-1)
    {
        response.send({message:"invalidId"})
    }
    else{
        pro.splice(indexToRemovePro,1)
        response.send({message:"product deleted"})
    }
})
module.exports=productApp;