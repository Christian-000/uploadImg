import express from 'express';
import morgan from 'morgan';
import indexRoutes from './routes/index'
import path from 'path'

const app = express();


// settings
app.set('port', process.env.PORT || 3001)

// middlewares
app.use(morgan('dev'));
app.use(express.json());
// routes
app.use('/api', indexRoutes)

// 

app.use('/public', express.static(path.resolve('public')))



export default app;