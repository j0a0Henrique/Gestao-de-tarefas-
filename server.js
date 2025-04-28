const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const rateLimit = require('express-rate-limit');

// Middleware: Limitação de taxa
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Você fez muitas requisições. Tente novamente em 15 minutos.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter); // <- aplica o middleware aqui

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));

// Rotas da API
app.use('/api', userRoutes);

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'ViewPage.html'));
});

// Swagger (se estiver usando)
const setupSwagger = require('./swagger');
setupSwagger(app);

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
