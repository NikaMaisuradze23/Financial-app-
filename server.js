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

mongoose.connect("mongodb://localhost:27017/mydatabase", { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Database connected successfully"))
.catch(err => console.log(err));


const userSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    password: String
  });
  
const User = mongoose.model("User", userSchema);
  
app.post("/register", async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);     
    const id = Date.now().toString();
    const name = req.body.name;
    const email = req.body.email;
  
    const user = new User({
      id: id,
      name: name,
      email: email,
      password: hashedPassword
    });
  
    user.save((err) => {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        res.redirect("/login");
      }
    });
});

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