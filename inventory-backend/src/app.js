import express from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
import indexRouter from './routes/index';

dotenv.config();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Connect to MongoDB Atlas

// Get DB URI from environment
const mongoDBURI = `mongodb+srv://darren:${process.env.DB_PASS}@cluster0.jkoko.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoDBURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
/* eslint-disable no-console */
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
db.on('connected', () => { console.log('Connected succesfully'); });
/* eslint-enable no-console */

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
