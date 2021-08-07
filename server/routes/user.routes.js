const router= require('express').Router();
const userControllers= require('../controllers/user.controllers')


router.get("/test" , userControllers.test)
router.get("/logout", userControllers.logout)
router.get("/getdata", userControllers.getDataUser)

router.post("/register", userControllers.register)
router.post("/login" , userControllers.login)
router.post("/update" , userControllers.updateData)


module.exports = router;