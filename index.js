import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './src/routes/userRoutes.js';
import postRoutes from './src/routes/postRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Rutas
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

//  Ruta raíz (opcional, solo para mostrar algo en el navegador)
app.get('/', (req, res) => {
  res.send('Servidor funcionando 🚀');
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error de conexión:", err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

