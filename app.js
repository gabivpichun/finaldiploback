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

/*const adminRouter = require('./routes/admin');*/
const loginRouter = require('./routes/admin/login');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Middlewares
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'cristobalencordoba25',
  resave: false,
  saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

/*ejemplos de consultas*/
//select

var pool = require("./bd");
pool.query("select * from alumnos").then(function (resultados) {
  console.log(resultados)
});

//insert
var pool = require("./bd");
var obj = {
  nombre: "Juan",
  apellido: "Lopez"
  }
pool. query("insert into alumnos set ?", [obj]). then(function( resultados) {
console.log(resultados)
});

var obj = {
nombre:'Flavia', 
apellido:'Lopez', 
trabajo: "docente",
edad: 38, 
salario: 15000000,
mail: 'juanlopez@gmail.com'
} 






app.use('/contactos', contactosRouter);
app.use('/nosotros', nosotrosRouter);

// Rutas administrativas
/*app.use('/admin/login', loginRouter);*/
app.use('/admin', adminRouter);

/*console.log('loginRouter:', loginRouter); // ← debe mostrar [Function: router]*/


// Rutas simples
app.get('/prueba', (req, res) => {
  res.send('hola soy la pagina de prueba');
});

app.get('/destacados', (req, res) => {
  res.send('hola soy la pagina de destacados');
});

app.get('/perfil', (req, res) => {
  if (req.session.nombre) {
    res.json({ logueado: true, nombre: req.session.nombre });
  } else {
    res.json({ logueado: false });
  }
});


app.post('/ingresar', (req, res) => {
  if (req.body.nombre) {
    req.session.nombre = req.body.nombre;
    res.json({ status: 'ok', nombre: req.body.nombre });
  } else {
    res.status(400).json({ status: 'error', message: 'Nombre requerido' });
  }
});

app.get('/salir', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});


/*// Middleware para manejar 404
app.use((req, res, next) => {
  next(createError(404));
});*/

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
