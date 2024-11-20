import express from 'express'
import connectDB from './config/connection.js';
import 'dotenv/config'
import projectRoutes from './routes/projectRoutes.js'
import TodoRoutes from './routes/TodoRoutes.js'
import userRoutes from './routes/userRoutes.js'
const app = express();
app.use(express.json())



const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, Node.js!');
});
app.use('/project',projectRoutes)
app.use('/todo',TodoRoutes)
app.use('/user',userRoutes)


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

connectDB()