const { json, response } = require("express");
const transectionModel = require("../models/Transection")
const moment = require('moment');
const getAllTransection = async (req, res) => {
    try {
        const { frequency, selectedDate, type } = req.body;
        const transections = await transectionModel.find({
            ...(frequency !== 'custom' ? {
                date: {
                    $gt: moment().subtract(Number(frequency), 'd').toDate(),
                },
            } : {
                date: {
                    $gte: selectedDate[0],
                    $lte: selectedDate[1]
                },
            }),
            user_id: req.body.user_id,

            ...(type !== 'all' && { type })

        });
        // return res.status(200).json({
        //     status: true, message: 'List', data: transections
        // })
        res.status(200).json(transections)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const addTransection = async (req, res) => {
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