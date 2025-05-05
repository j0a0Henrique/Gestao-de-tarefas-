import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const result = await pool.query('SELECT * FROM tarefas ORDER BY id ASC');
      return res.status(200).json(result.rows);

    } else if (req.method === 'POST') {
      const { hora, tarefa, data } = req.body;
      if (!hora || !tarefa || !data) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }
      const result = await pool.query(
        'INSERT INTO tarefas (hora, tarefa, data) VALUES ($1, $2, $3) RETURNING *',
        [hora, tarefa, data]
      );
      return res.status(201).json(result.rows[0]);

    } else if (req.method === 'PUT') {
      const { id, hora, tarefa, data } = req.body;
      if (!id || !hora || !tarefa || !data) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }
      const result = await pool.query(
        'UPDATE tarefas SET hora = $1, tarefa = $2, data = $3 WHERE id = $4 RETURNING *',
        [hora, tarefa, data, id]
      );
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }
      return res.status(200).json(result.rows[0]);

    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'ID é obrigatório para deletar' });
      }
      const result = await pool.query('DELETE FROM tarefas WHERE id = $1', [id]);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }
      return res.status(204).end();

    } else {
      return res.status(405).json({ error: 'Método não permitido' });
    }
  } catch (error) {
    console.error('Erro na API:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
