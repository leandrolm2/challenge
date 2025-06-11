import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
dotenv.config();
import routes from './routes';

if (!process.env.PORT) {
  throw new Error('PORT is not defined');
}

const PORT = parseInt(process.env.PORT as string, 10);
const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});