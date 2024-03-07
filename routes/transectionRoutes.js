const express = require("express");
const { addTransection, getAllTransection, editTransection, deleteTransection } = require("../controllers/transectionController");



const router = express.Router();

router.post('/add-transections', addTransection);
router.post('/edit-transections', editTransection);
router.post('/delete-transections', deleteTransection);
router.post('/get-transections', getAllTransection);

module.exports = router