import express from 'express'
import { getText } from './controller.js';
import cors from 'cors'
 
const app = express()

app.use(cors({
    origin: '*',
}))

app.use(express.json({ limit: '50mb' }));


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post("/get-text", getText)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    console.log(err);
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})
