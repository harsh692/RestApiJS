const express = require("express");
const {handleTaskInput, handleListTasks,handleCompletedTasks,handleEditTask} = require("../controllers/task");
const router = express.Router();

router.post('/',handleTaskInput);
router.get('/',handleListTasks);
router.delete('/:id',handleCompletedTasks);
router.patch('/:id',handleEditTask);

module.exports = router;