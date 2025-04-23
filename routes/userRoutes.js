const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

// ROTAS AJUSTADAS PARA FUNCIONAR COM /api/tasks
router.get('/tasks', controller.getTasks);
router.post('/tasks', controller.createTask);
router.put('/tasks/:id', controller.updateTask);
router.delete('/tasks/:id', controller.deleteTask);

module.exports = router;
/**
 * @swagger
 * /:
 *   get:
 *     summary: Lista todas as tarefas
 *     responses:
 *       200:
 *         description: Lista de tarefas
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Cria uma nova tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hora
 *               - tarefa
 *               - data
 *             properties:
 *               hora:
 *                 type: string
 *               tarefa:
 *                 type: string
 *               data:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tarefa criada
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tarefas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hora
 *               - tarefa
 *               - data
 *             properties:
 *               hora:
 *                 type: string
 *                 example: "14:00"
 *               tarefa:
 *                 type: string
 *                 example: "Estudar Angular"
 *               data:
 *                 type: string
 *                 example: "2025-04-21"
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa existente
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hora:
 *                 type: string
 *               tarefa:
 *                 type: string
 *               data:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Deleta uma tarefa
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa deletada com sucesso
 */