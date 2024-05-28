//creating mini express userApp
const exp = require('express');
const userApp = exp.Router();

userApp.get('/test-user' , (req,res)=>{
    res.send({message: "this is from test user"})
})










//export userApp
module.exports = userApp;