const { new: _new, create, delete: _delete } = require("../controllers/SessionController")

module.exports = router => {
    router.get("/login", _new)
    router.post("/authenticate", create)
    router.get("/logout", _delete)
}