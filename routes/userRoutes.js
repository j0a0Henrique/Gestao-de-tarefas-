const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.get('/tasks', controller.getTasks);
router.post('/tasks', controller.createTask);
router.delete('/tasks/:id', controller.deleteTask);

module.exports = router;