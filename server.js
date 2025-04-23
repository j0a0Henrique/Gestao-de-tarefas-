const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path'); // Adicione esta linha
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

// Middleware para habilitar CORS
app.use(cors());

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Servir arquivos estáticos da pasta views
app.use(express.static(path.join(__dirname, 'views')));

// Define o prefixo /api para as rotas
app.use('/api', userRoutes);

// Rota para a página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'ViewPage.html'));
});

// Define a porta, com fallback para 3000
const PORT = process.env.PORT || 3000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});