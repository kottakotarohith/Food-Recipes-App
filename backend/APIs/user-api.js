//creating mini express userApp
const exp = require('express');
const userApp = exp.Router();
const bcryptjs = require('bcryptjs')
const expressAsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
require('dotenv').config()




let usersCollection
//get usersCollection object ( using middleware)
userApp.use((req, res, next) => {
    usersCollection = req.app.get('usersCollection')
    next()
})


//user registration route
userApp.post('/user', expressAsyncHandler(async (req, res) => {

    //get new user data from client
    const newUser = req.body;
    //check if username is already existing or not
    const dbUser = await usersCollection.findOne({ username: newUser.username })
    if (dbUser != null) {
        res.send({ message: "the username is already taken" })
    } else {
        //hash the password
        const hashedPassword = await bcryptjs.hash(newUser.password, 7)
        //replace password with hashed password
        newUser.password = hashedPassword
        //adding the user data to db
        await usersCollection.insertOne(newUser)
        //send res
        res.send({ message: "new user created" })
    }

}))


//user login route
userApp.post('/login', expressAsyncHandler(async (req, res) => {
    //user credentials
    const userCredentials = req.body
    //checking if user exists
    const dbUser = await usersCollection.findOne({ username: userCredentials.username })
    if (dbUser == null) {
        res.send({ message: "invalid username" })
    } else {
        const passwordMatch = await bcryptjs.compare(userCredentials.password, dbUser.password)
        if (!passwordMatch) {
            res.send({ message: "invalid password" })
        } else {
            const signedToken = jwt.sign({ username: dbUser.username }, process.env.SECRET_KEY, { expiresIn: '1d' })
            res.send({ message: "login successful", token: signedToken, user: dbUser })
        }
    }
}))


//export userApp
module.exports = userApp;