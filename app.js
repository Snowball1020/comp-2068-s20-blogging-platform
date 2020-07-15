
const express = require("express")
const app = express()
app.use(express.static("public"))
require("dotenv").config()
const path = require("path")

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



const passport = require("passport")
const session = require("express-session")
app.use(session({
    secret: "any salty secret here",
    resave: true,
    saveUninitialized: false
}))

//setting up passport
app.use(passport.initialize())
app.use(passport.session())
const User = require("./models/User")
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//setting up passport jwt

const JwtStrategy = require("passport-jwt").Strategy;
const opts = {};
opts.jwtFromRequest = function (req) {
    const token = (req && req.cookies) ? req.cookies
    ["token"] : null
    return token
}

opts.secretOrKey = "superSecretSaltKey"

passport.use("jwt", new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
        if (err) return done(err, false);
        if (user) return done(null, user);
        return done(null, false)
    })
}));





//Set our views directories

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use("/css", express.static("assets/css"))
app.use("/images", express.static("assets/images"))
app.use("/javascript", express.static("assets/javascript"))



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

    //authenticate helper
    res.locals.authorized = req.isAuthenticated();

    if (res.locals.authorized) res.locals.email = req.session.passport.user
    next();
})

const routes = require("./routes.js")

app.use("/", routes)

app.get("/test", (req, res) => {
    res.status(200).json({ message: "Hello World" })
})


const clientRoot = path.join(__dirname, "/client/build")
app.use((req, res, next) => {
    if (req.method === 'GET' && req.accepts('html') && !req.is('json')
        && !req.path.includes('.')) {
        res.sendfile("index.html", { clientRoot });
    } else next();
})

//start our server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`))
