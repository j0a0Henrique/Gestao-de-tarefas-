const model = require('../models/userModel');

// GET
exports.getTasks = async (req, res) => {
  try {
    const tasks = await model.getAllTasks();
    res.json(tasks);
  } catch (err) {
    console.error('Erro ao buscar tarefas:', err);
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
};

// POST
exports.createTask = async (req, res) => {
  try {
    const tarefa = req.body;
    await model.createTask(tarefa);
    res.status(201).json({ message: 'Tarefa criada com sucesso' });
  } catch (err) {
    console.error('Erro ao criar tarefa:', err);
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
};

// PUT
exports.updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { hora, tarefa, data } = req.body;
    if (!hora || !tarefa || !data) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }
    await model.updateTask(id, { hora, tarefa, data });
    res.status(200).json({ message: 'Tarefa atualizada com sucesso.' });
  } catch (err) {
    console.error('Erro ao atualizar tarefa:', err);
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
};

// DELETE
exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    await model.deleteTask(id);
    res.status(200).json({ message: 'Tarefa deletada com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar tarefa:', err);
    res.status(500).json({ error: 'Erro ao deletar tarefa' });
  }
};
