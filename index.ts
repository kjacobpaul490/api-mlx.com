import express from 'express';
import mathRoutes from './src/routes/mathRoutes.js';

const app = express();
const port = 3000;
app.use(express.json());
app.use("/",mathRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
