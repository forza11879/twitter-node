import express from 'express';
import dotnev from 'dotenv';
import cors from 'cors';

// routes
import mainRoute from './routes/main.js';

const app = express();

app.use(cors());

dotnev.config({ path: './config/dev.env' });

// Mount Rout
app.use('/', mainRoute);

const port = process.env.PORT;
const server = createServer(app);
server.listen(port, function () {
  console.log(`Server is up on port ${port}`);
});
