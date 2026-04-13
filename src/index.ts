import express from 'express';
import dotenv from 'dotenv';
import articlesRoutes from './routes/articles';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/articles', articlesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});