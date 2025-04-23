const db = require('../db');

// Buscar todas as tarefas
exports.getAllTasks = async () => {
  const result = await db.query('SELECT * FROM tasks ORDER BY data, hora');
  return result.rows;
};

// Adicionar nova tarefa
exports.createTask = async (tarefa) => {
  const { hora, tarefa: descricao, data } = tarefa;
  await db.query(
    'INSERT INTO tasks (hora, tarefa, data) VALUES ($1, $2, $3)',
    [hora, descricao, data]
  );
};

exports.updateTask = async (id, tarefa) => {
  const { hora, tarefa: descricao, data } = tarefa;
  const query = 'UPDATE tarefas SET hora = $1, tarefa = $2, data = $3 WHERE id = $4';
  const values = [hora, descricao, data, id];
  await db.query(query, values);
}

// Remover tarefa por ID
exports.deleteTask = async (id) => {
  await db.query('DELETE FROM tasks WHERE id = $1', [id]);
};