const express = require('express');
const mongoose = require('mongoose');
const Poll = require("./models/Poll")
const app = express();

mongoose.connect("mongodb://localhost:27017/polls", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', 'views');

app.get('/', (req, res) => {
  res.render('index')
});

app.get('/new', (req, res) => {
  res.render('new')
})

app.get('/prueba', (req, res) => {
  res.render('poll')
});
app.listen(3000, () => console.log('listeng on port 3000'));