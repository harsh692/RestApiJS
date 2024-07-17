const express = require("express");

const router = express.Router();
const {
    handleDeleteUserById,
    handleEditUserById,
    handleGetAllUsers,
    handleGetSingleUserById,
    handlecreateUser} = require("../controllers/users");

router.get('/',handleGetAllUsers);

router.get('/:id',handleGetSingleUserById);

router.post('/',handlecreateUser);

router.patch('/:id', handleEditUserById);

router.delete('/:id', handleDeleteUserById);

module.exports = router;