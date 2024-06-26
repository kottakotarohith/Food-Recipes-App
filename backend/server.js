//creating express application
const exp = require("express")
const app = exp()
require('dotenv').config()
const mongoClient = require('mongodb').MongoClient;
const path = require("path")


//deploy react build in server
app.use(exp.static(path.join(__dirname,'../client/build')))


//body parser (to parse the body req)
app.use(exp.json())


//connect to db
mongoClient.connect(process.env.DataBase_URL)
.then(client=>{
    //get db object
    const foodRecipeApp = client.db('foodRecipeApp')
    //get collection obj
    const usersCollection = foodRecipeApp.collection('usersCollection')
    const recipesCollection = foodRecipeApp.collection('recipesCollection')
    
    //share collection obj with express app
    app.set('usersCollection',usersCollection)
    app.set('recipesCollection',recipesCollection)
    //confirm connection status
    console.log("DataBase connection successful")

})
.catch(err=>console.log("Error in DataBase connection"))



//importing api routes
const userApp = require('./APIs/user-api')
//if path starts with user-api then req is given to userApp
app.use('/user-api' , userApp)

//deal with  refresh
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../client/build/index.html'))
})


//express error handler
app.use((err,req,res,next)=>{
    res.send({message:"error occurred" , payload:err.message})
})


//assign port number
const port = process.env.PORT || 2721
app.listen(port , ()=>console.log(`server running on port ${port}...`))