const { json } = require("express");
const transectionModel = require("../models/Transection")

const getAllTransection = async(req, res) => {
    try {
        const transections = await transectionModel.find({user_id:req.body.user_id});
        res.status(200),json(transections)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const addTransection = async(req, res) => {
    try {
        const newTransection = new transectionModel(req.body)
        await newTransection.save();
        res.status(201).send("Transection Created");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { getAllTransection, addTransection };