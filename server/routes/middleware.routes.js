const router= require("express").Router()
const middleware= require("../middleware/user.middleware")
router.get("*", middleware.verif)
router.get("/", middleware.verifCookie)

module.exports=router;