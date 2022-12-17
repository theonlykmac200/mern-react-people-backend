//Dependencies
require("dotenv").config();
const {PORT, DATABASE_URL} = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");



mongoose.connect(DATABASE_URL)
mongoose.connection
    .on("open", () => console.log("you are connected to mongodb"))
    .on("close", () => console.log("you are disconnected from mongoodb"))
    .on("error", (error) => console.log(error))

// MODEL
    const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String
})

const People = mongoose.model("People", PeopleSchema)

// MIDDLEWARE
app.use(cors()) // prevents cross site scripting attacks, allows access to server from all orgins i.e. react frontend 
app.use(morgan('dev')) // loggs details of all server hits to terminal
app.use(express.json()) // parse json bodies from requests
app.use(express.urlencoded({extended: false})) // parse urlencoded bodies from requests (form data

// ROUTES - IDUC

app.get("/", (req, res) => {
    res.send("hello world")

})
// INDEX
app.get("/people", async (req, res) => {
    try{
    res.status(200).json(await People.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
})

// CREATE
app.post("/people", async (req, res) => {
    try {
    res.status(200).json(await People.create(req.body))
    } catch (error) {
        res.status(400).json(error)
    }
})
// Delete
app.delete("/people/:id", async (req, res) => {
    try {
    res.status(200).json(await People.findByIdAndRemove(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
})
// Update
app.put("/people/:id", async (req, res) => {
    try {
    res.status(200).json(await People.findByIdAndUpdate(req.params.id , req.body, {new: true}))
    } catch (error) {
        res.status(400).json(error)
    }
})


app.listen(PORT,() => console.log(`shiny happy people holding hands on port ${PORT}`))