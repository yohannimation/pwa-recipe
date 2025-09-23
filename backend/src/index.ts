import express, { Request, Response } from 'express';

import recipeRoutes from './routes/recipeRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());

// Routes
app.use('/api/recipes', recipeRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.send('Recipe API');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
