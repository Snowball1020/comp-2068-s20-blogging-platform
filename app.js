
const express = require("express")
const app = express()
app.use(express.static("public"))
require("dotenv").config()
const path = require("path")


//Set our views directories

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use("/css", express.static("assets/css"))
app.use("/images", express.static("assets/images"))
app.use("/javascript", express.static("assets/javascript"))

//mongo acceess
const mongoose = require("mongoose")
mongoose.connect(process.env.DB_URI, {
    auth: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log("DB CONNECTED "))
    .catch(err => console.error(`Error:${err}`));

//implement body parser
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//setup our session
const session = require("express-session")
app.use(session({
    secret: "any salty secrets here",
    resave: true,
    saveUninitialized: false
}))

//setup flash notification

const flash = require("connect-flash")
app.use(flash())
app.use("/", (req, res, next) => {

    res.locals.pageTitle = "Untitled";
    //  console.log(req.flash())
    //passing along flash messages
    res.locals.flash = req.flash();
    res.locals.formData = req.session.formData || {};
    req.session.formData = {};
    console.log(res.locals.flash)
    next();
})

const routes = require("./routes.js")

app.use("/", routes)

//start our server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))
