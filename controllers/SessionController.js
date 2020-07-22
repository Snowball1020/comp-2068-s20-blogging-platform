const User = require("../models/User")
const viewPath = `sessions`
const passport = require("passport")
const jwt = require("jsonwebtoken")

exports.new = (req, res) => {
    res.render(`${viewPath}/new`, {
        pageTitle: "Login"
    })
}

exports.create = (req, res, next) => {

    passport.authenticate("local", (err, user) => {

        if (err || !user) return res.status(401).json({
            status: "failed",
            message: "Not Authorized",
            error: err
        })


        req.login(user, err => {
            if (err) return res.status(401).json({
                status: "failed",
                message: "Not Authorized",
                error: err
            })

            return res.status(200).json({
                status: "success",
                message: "Logged in successfully",
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email
                }

            })

        })

    })(req, res, next)

}

exports.delete = (req, res) => {
    req.logout();
    req.flash("success", "you were logged out");
    res.redirect("/")
}
