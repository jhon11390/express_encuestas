const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const Poll = require("./models/Poll")
const app = express();

mongoose.connect("mongodb://localhost:27017/polls", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

app.use(express.urlencoded({extended: true}));
app.use('/assets', express.static('assets'));
app.use(methodOverride('_method'))
app.set('view engine', 'pug');
app.set('views', 'views');

app.get('/', async (req, res) => {
  const polls = await Poll.find();
  res.render('index', {polls})
});

app.get('/polls/:id', async (req, res) => {
  const poll = await Poll.findById(req.params.id);
  res.render('poll', {currentPoll: poll});
})

app.get('/polls/new', (req, res) => {
  res.render('new')
})

app.post('/polls', async (req, res, next) => {
  const data = {
    title: req.body.title,
    description: req.body.description,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3
  };
  try{
    const poll = new Poll(data);
    await poll.save()
  }catch(e){
    return next(e)
  }
  res.redirect("/")
})

app.delete("/polls/:id", async (req, res, next) => {
  try{
    await Poll.deleteOne({_id: req.params.id});
  }catch(e){
    return next(e)
  }
  res.redirect("/")
})
app.listen(3000, () => console.log('listeng on port 3000'));