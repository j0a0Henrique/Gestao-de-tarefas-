const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');
const setupSwagger = require('./swagger');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

// Middleware: Limitação de taxa
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,                 // Máximo de 100 requisições
  message: 'Você fez muitas requisições. Tente novamente em 15 minutos.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter); 
app.use(cors());
app.use(express.json());

// Aqui está certo: servindo os arquivos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API
app.use('/api', userRoutes);

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ViewPage.html'));
});

// Swagger Docs
setupSwagger(app);

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
