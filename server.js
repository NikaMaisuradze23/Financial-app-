const express = require("express")
const app = express()
const bcrypt = require("bcrypt") 
const mongoose = require("mongoose")
const bodyParser = require("body-parser")


app.use(bodyParser.json())
app.use(express.static("public"))
app.use(bodyParser.urlencoded({
    extended: true
}))

// mongoose.connect("mongod://Localhost:27017/mydb")
// const db = mongoose.connect
// db.on("error", ()=>console.log("Error conection Database"))
// db.once('open', ()=>console.log("conection Database sucsesful"))


app.post("/register", async (req, res) => {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)     
        const id = Date.now().toString()
        const name =  req.body.name
        const email = req.body.email

        const data = {
            "id":id,
            "name": name,
            "email": email,
            "password": hashedPassword 
        }
            
        db.collection('users').insertOne(data,(err,collection) =>{
            if(err){
                throw err;
            }
            console.log("Record instert Succssfuly")
        })

        return res.redirect('/login')

})

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.get("/login", (req, res) => {
    res.render("login.ejs")
})

app.get("/register", (req, res) => {
    res.render("register.ejs")
})



app.listen(3000)