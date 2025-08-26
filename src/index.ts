import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import productRoutes from './routes/productRoute';

dotenv.config();

const app: Application = express();
app.use(express.json());

// Rutas
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/products', productRoutes);

//  Ruta raíz (opcional, solo para mostrar algo en el navegador)
app.get('/', (req: Request, res: Response): void => {
  res.send('Servidor funcionando 🚀');
});

// Conexión a MongoDB
const mongoUri: string = process.env.MONGO_URI || '';
mongoose.connect(mongoUri)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err: Error) => console.error("❌ Error de conexión:", err));

const port: number = parseInt(process.env.PORT || '3000');
app.listen(port, (): void => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
