const express = require("express");
const { addTransection, getAllTransection } = require("../controllers/transectionController");



const router =express.Router();

router.post('/add-transection', addTransection);
router.post('/get-transections',getAllTransection);

module.exports = router