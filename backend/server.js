//creating express application
const exp = require("express")
const app = exp()
require('dotenv').config()


//body parser (to parse the body req)
app.use(exp.json())


//importing api routes
const userApp = require('./APIs/user-api')
//if path starts with user-api then req is given to userApp
app.use('/user-api' , userApp)




//express error handler
app.use((err,req,res,next)=>{
    res.send({message : "error", payload:err})
})

//assign port number
const port = process.env.PORT || 2721
app.listen(port , ()=>console.log(`server running on port ${port}...`))