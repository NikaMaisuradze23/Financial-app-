const express = require("express")
const app = express()
const bcrypt = require("bcrypt") 
const bodyParser = require("body-parser")
const dbConnect = require("./mongodb")
const { render } = require("ejs")


app.use(bodyParser.json())
app.use(express.static("public"))
app.use(bodyParser.urlencoded({
    extended: true
}))

app.post("/register", async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);     
    const id = Date.now().toString();
    const name = req.body.name;
    const email = req.body.email;
  
    const insertData = async ()=> {
      let data = await dbConnect();
      let result = await data.insertOne(
          {id:id, name:name, email:email, password: hashedPassword}
          )
          
      console.log(result)
  }
  
  insertData();
  res.render("login.ejs")
  
});

app.get("/login", async (res,resp) => {
  let data = await dbConnect()
  data = await data.find().toArray()
  resp.send(data)
})

app.get("/", (req, res) => {
    res.render("register.ejs")
})

app.get("/login", (req, res) => {
    res.render("login.ejs")
})

app.get("/register", (req, res) => {
    res.render("register.ejs")
})



app.listen(3000)