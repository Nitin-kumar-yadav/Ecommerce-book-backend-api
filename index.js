import express from 'express';
import { configDotenv } from 'dotenv';
import { connectDB } from './connection/db.js';
import cors from "cors";
import bookRoutes from './routes/bookRoutes.js';
import fileUpload from 'express-fileupload';

configDotenv();

const app = express();

app.use(fileUpload({
    useTempFiles: true,
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/books', bookRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at ${process.env.PORT}`);
    connectDB();
});