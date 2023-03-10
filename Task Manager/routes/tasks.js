const express = require('express');
const { getAllTasks, createTask, getTask, updateTask, deleteTask } = require('../controllers/tasks');
const router = express.Router();
// const tasksController = '../controllers/tasks.js'


router.get('/',getAllTasks);

router.post('/',createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)



module.exports = router;