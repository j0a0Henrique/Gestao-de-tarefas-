// api/tasks.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

module.exports = async (req, res) => {
  const method = req.method;
  const { id } = req.query;

  try {
    if (method === 'GET') {
      const result = await pool.query('SELECT * FROM tarefas ORDER BY id DESC');
      return res.status(200).json(result.rows);
    }

    if (method === 'POST') {
      const { hora, tarefa, data } = req.body;
      await pool.query('INSERT INTO tarefas (hora, tarefa, data) VALUES ($1, $2, $3)', [hora, tarefa, data]);
      return res.status(201).json({ message: 'Tarefa criada' });
    }

    if (method === 'PUT') {
      const { hora, tarefa, data } = req.body;
      await pool.query('UPDATE tarefas SET hora=$1, tarefa=$2, data=$3 WHERE id=$4', [hora, tarefa, data, id]);
      return res.status(200).json({ message: 'Tarefa atualizada' });
    }

    if (method === 'DELETE') {
      await pool.query('DELETE FROM tarefas WHERE id=$1', [id]);
      return res.status(200).json({ message: 'Tarefa removida' });
    }

    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Método ${method} não permitido`);
  } catch (error) {
    console.error('Erro na função:', error);
    res.status(500).json({ erro: 'Erro no servidor' });
  }
};
