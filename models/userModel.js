const db = require('./db');

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

// Remover tarefa por ID
exports.deleteTask = async (id) => {
  await db.query('DELETE FROM tasks WHERE id = $1', [id]);
};