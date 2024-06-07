//creating mini express userApp
const exp = require('express');
const userApp = exp.Router();
const bcryptjs = require('bcryptjs')
const expressAsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
require('dotenv').config()




let usersCollection
let recipesCollection
//get usersCollection object ( using middleware)
userApp.use((req, res, next) => {
    usersCollection = req.app.get('usersCollection')
    recipesCollection = req.app.get('recipesCollection')

    // Check if usersCollection and recipesCollection are properly initialized
    if (!usersCollection || !recipesCollection) {
        return res.status(500).send({ message: "Database collections are not initialized properly" });
    }

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



//adding recipes
userApp.post('/recipe', expressAsyncHandler(async (req, res) => {

    //get recipe data from client
    const newRecipe = req.body
    //check if recipe name is already existing or not
    const dbRecipe = await recipesCollection.findOne({ title: newRecipe.title })
    if (dbRecipe != null) {
        res.send({ message: "the recipe name is already taken" })
        } else {
            //adding the recipe data to db
            await recipesCollection.insertOne(newRecipe)
            //send res
            res.send({ message: "new recipe added" })
            }
}))

// get  all recipes
userApp.get('/recipes', expressAsyncHandler(async (req, res) => {
    //get all recipes from db
    const allRecipes = await recipesCollection.find({}).toArray()
    //send res
    res.send({message:"recipes" , payload:allRecipes})
}))



//search recipe
userApp.get('/search', expressAsyncHandler(async(req,res)=>{
    // console.log(req.query.search)
    const searchQuery=req.query.search
    if (!searchQuery) {
        return res.status(400).send({ message: "No search query provided" });
    }
    const words = searchQuery.split(' ');

    try {
        // Perform a search for each word individually
        const wordSearchPromises = words.map(word =>
            recipesCollection.find({
                $or: [
                    { title: new RegExp(word, 'i') },
                    { 'ingredients.name': new RegExp(word, 'i') },  // assuming recipes have an 'ingredients' field
                    { tags : new RegExp(word,'i') },//search  in tags
                    { toppings : new RegExp(word, 'i') }//search in toppings
                ]
            }).toArray()
        );

        

        // Wait for all searches to complete
        const searchResults = await Promise.all([
            ...wordSearchPromises
        ]);

        // Flatten the results array and remove duplicates
        const results = [...new Set(searchResults.flat().map(recipe => JSON.stringify(recipe)))].map(str => JSON.parse(str));

        res.send({ message: "Search results", payload: results });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}))


//export userApp
module.exports = userApp;