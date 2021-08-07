const router = require("express").Router();
const postControllers= require("../controllers/post.controllers")

router.get("/getproduit", postControllers.getProduit);
router.get("/remove/:id", postControllers.delete)

router.post("/addproduit" , postControllers.addproduit)
router.post("/prix/:id", postControllers.updatePrix)
module.exports= router;