require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var openAiRouter = require('./routes/OpenAi')
var geminiRouter = require('./routes/Gemini')

var app = express();

// --- CORS: Apply globally, including on errors and 404s ---
const FRONTEND_ORIGIN = 'https://deep-scan-ai-code-reviewer.vercel.app';

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', FRONTEND_ORIGIN);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
// If you want to use the cors package as well (for safety), you can uncomment below:
// app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/openai', openAiRouter);
app.use('/gemini', geminiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // Ensure CORS headers on 404 as well
  res.header('Access-Control-Allow-Origin', FRONTEND_ORIGIN);
  res.header('Access-Control-Allow-Credentials', 'true');
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // Ensure CORS headers on errors
  res.header('Access-Control-Allow-Origin', FRONTEND_ORIGIN);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
