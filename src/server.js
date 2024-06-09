const express = require('express');
const path = require('path');
const {default: mongoose} = require('mongoose');
const User = require('./models/users.model');
const passport = require('passport');

const app = express();

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

mongoose.connect(`mongodb+srv://201352001:1q2w3e4r!@cluster0.qvjuoh9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    console.log("mongoDB connected!");
  })
  .catch((err) => {
    console.log(err);
  })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('<h1>hello!</h1>')
});

app.get('/login', function (req, res, next) {
  res.render('login');
});

app.post('/login', (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) return res.json({msg: info})

    req.logIn(user, function(err) {
      if(err) return next(err);
      res.redirect('/');
    })
  })
})

app.get('/signup', function (req, res, next) {
  res.render('signup');
});

app.post('/signup', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
});

app.listen(4000, () => {
  console.log('Listening on 4000...');
});