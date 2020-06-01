console.log("exported the module")
const { home, about } = require("../controllers/PagesController")

module.exports = router => {

    router.get("/", home)

    router.get("/about", about)

}