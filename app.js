
const express = require("express")
const app = express()

const path = require("path")

//Set our views directories

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

const routes = require("./routes.js")

app.use("/", routes)

//start our server

app.listen(process.env.PORT || 3000, (port) => console.log(`Listening on port ${port}`))
