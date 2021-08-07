const router = require("express").Router();
const userControllersNoToken= require("../controllers/user.controllers.no")
const mailControllers= require("../controllers/mail.controllers")

router.get("/allusers", userControllersNoToken.getAllusers)
router.get("/getproduits", userControllersNoToken.getProduit)
router.get("/setid/:id" , userControllersNoToken.setPostId)
router.post("/sendmail", mailControllers.sendMail )
module.exports= router; 