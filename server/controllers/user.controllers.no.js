const userModels= require('../models/user.models')
const postModels= require('../models/post.models')

module.exports.getAllusers = async (req, res) => {
    await userModels.find().select("-password")
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
}

module.exports.setPostId= async (req, res) => {
    const postId=req.params.id
    res.cookie("barbershop_2", postId, {maxAge:30000000})
    res.json("ok")
}

module.exports.getProduit=async (req,res) => {

    const postId =req.cookies.barbershop_2
    await postModels.find({ postId})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(400).json(err.message)
        })
}