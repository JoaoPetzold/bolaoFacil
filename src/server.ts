import 'reflect-metadata';
import express from 'express';
import "./database/config";
import routes from './routes';

const app = express();
app.use(express.json())
app.use(routes)


app.listen(process.env.NODE_PORT);