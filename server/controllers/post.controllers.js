const postModels = require('../models/post.models')
const userModels= require("../models/user.models")
module.exports.addproduit = async (req, res) => {
    const { url, prix } = req.body
    const postId = req.cookies.barbershop_1
    await userModels.findById(postId)
        .then(async (data)=>{
            const email= data.email
            await postModels.create({ url, prix, postId ,email})
                .then(dat => {
                    res.status(200).json(dat)
                })
                .catch(err => {
                    res.status(400).json(err.message)
                })

        }).catch(err=>console.log(err.message))
}

module.exports.getProduit = async (req, res) => {
    const postId = req.cookies.barbershop_1
    await postModels.find({ postId })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
}

module.exports.delete = async (req, res) => {
    await postModels.findByIdAndDelete(req.params.id)
        .then(data => {
            res.status(200).json("deleted")
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
}

module.exports.updatePrix = async (req, res) => {
    const { prix } = req.body
    await postModels.findByIdAndUpdate(req.params.id,
        { $set: { prix: prix } },
        { upsert: true, new: true },
        (err, data) => { if (!err) res.status(200).json(data) }
    )
}