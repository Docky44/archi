import express from 'express';
import productRoutes from './src/routes/productRoutes.js';

const app = express();

app.use(express.json());
app.use(productRoutes);

app.use((req, res) => {
  res.status(404).send('Route non trouvée');
});

export default app;
