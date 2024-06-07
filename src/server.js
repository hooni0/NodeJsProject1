const express = require('express');
const path = require('path');
const { default: mongoose } = require('mongoose');

const app = express();

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('<h1>hello!</h1>')
});

app.get('/login', function (req, res, next) {
  res.render('login');
});

app.get('/signup', function (req, res, next) {
  res.render('signup');
});

app.listen(4000, () => {
  console.log('Listening on 4000...');
});