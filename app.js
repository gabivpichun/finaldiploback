const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');

require("dotenv").config();

const pool = require("./models/bd");

const indexRouter = require('./routes/index'); // ← nuevo index.js en routes/
const usersRouter = require('./routes/users');
const contactosRouter = require('./routes/contactos');
const nosotrosRouter = require('./routes/nosotros');

const adminRouter = require('./routes/admin/novedades');
const loginRouter = require('./routes/admin/login');
const adminNovedadesRouter = require('./routes/admin/novedades');
const apiRouter = require("./routes/api");


const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));4

app.use(session({
  secret: 'cristobalencordoba25',
  cookie: { maxAge: null },
  resave: false,
  saveUninitialized: true
}));

secured = async(req, res, next) => {
  try{
    console.log(req.session.id_usuario);
    if(req.session.id_usuario){
      next();
    } else {
      res.redirect("admin/login");
    }
    }catch(error) {
      console.log(error);
    }
  }

app.use("/admin/novedades",secured, );
app.use('/contactos', contactosRouter);
app.use('/nosotros', nosotrosRouter);
app.use('/admin/login', loginRouter);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/admin/novedades", secured, adminRouter);
app.use('/api', apiRouter);


module.exports = app;
