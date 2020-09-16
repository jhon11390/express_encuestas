const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');
const Poll = require("./models/Poll");
const User = require('./models/User');
const Result = require("./models/Result");
const { ObjectId } = require('mongoose');
const app = express();

mongoose.connect("mongodb://localhost:27017/polls", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

app.use(express.urlencoded({extended: true}));
app.use('/assets', express.static('assets'));
app.use(methodOverride('_method'));
app.use(cookieSession({
  secret: "encuestas_2020",
  maxAge: 24*60*60*1000
}));
const requireUser = (req, res, next) => {
  if(!res.locals.user){
      return res.redirect("/login")
  }
  next();
}

app.use(async (req, res, next) => {
  const userId = req.session.userId;
  if(userId){
      const user = await User.findById(userId);
      if(user){
          res.locals.user = user
      }else{
          delete req.session.userId;
      }
  }
  next();
});

app.use(flash());
app.use(function(req, res, next) {
  res.locals.success = req.flash('success');
  next();
})
app.set('view engine', 'pug');
app.set('views', 'views');


//Vistas para encuestas

app.get('/', async (req, res) => {
  const polls = await Poll.find();
  const user = req.session.userId;
  const users = await User.find();
  const results = await Result.find();
  res.render('index', {polls, user, users, results})
});


app.get('/polls/new', requireUser, (req, res) => {
  res.render('new')
});

app.get('/polls/:id', async (req, res) => {
  const poll = await Poll.findById(req.params.id);
  res.render('poll', {currentPoll: poll});
});


app.post('/polls', requireUser, async (req, res, next) => {
  const data = {
    title: req.body.title,
    description: req.body.description,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    user: res.locals.user
  };
  try{
    const poll = new Poll(data);
    await poll.save()
  }catch(e){
    return next(e)
  }
  req.flash('success', 'Encuesta creada con exito')
  res.redirect("/")
});

app.delete("/polls/:id", requireUser, async (req, res, next) => {
  try{
    await Poll.deleteOne({_id: req.params.id});
  }catch(e){
    return next(e)
  }
  req.flash('success', 'Encuesta eliminada con exito')
  res.redirect("/")
});

//vistas results

app.get('/results/:id', async (req, res) => {
  const poll = await Poll.findById(req.params.id);
  const allresults = await Result.count({pollId: req.params.id});
  const alloption1 = await Result.count({$and: [{pollId: req.params.id}, {results: poll.option1}]});
  const alloption1porcentage= await (alloption1/allresults*100).toFixed(1)
  const alloption2 = await Result.count({$and: [{pollId: req.params.id}, {results: poll.option2}]});
  const alloption2porcentage= await (alloption2/allresults*100).toFixed(1);
  const alloption3 = await Result.count({$and: [{pollId: req.params.id}, {results: poll.option3}]});
  const alloption3porcentage= await (alloption3/allresults*100).toFixed(1);
  res.render('results', {currentPoll: poll, allresults, alloption1, alloption2, alloption3, alloption1porcentage, alloption2porcentage, alloption3porcentage});
});

app.post('/results/:id', async (req, res, next) => {
  const vote = {
    pollId: req.params.id,
    results: req.body.results
  }
  try{
    const result = new Result(vote);
    await result.save()
  }catch(e){
    return next(e)
  }
  res.redirect('/results/'+req.params.id)
});

//Vistas para autententicacion

app.get('/register', (req, res) => {
  res.render('register')
});

app.get('/login', (req, res) => {
  res.render('login')
});

app.get('/logout', (req, res) => {
  req.session = null;
  res.clearCookie("session");
  res.clearCookie("session.sig");
  res.redirect("/login");
});

app.post('/register', async (req, res, next) => {
  try{
    const user = await User.create({
      email: req.body.email,
      password: req.body.password
    })
    res.redirect('/login')
  }catch(err){
    if(err.name === "ValidationError"){
      res.render('register', {errors: err.errors});
    }else{
      return next(err)
    }
  }
});

app.post('/login', async(req, res, next) => {
  try{
    const user = await User.authenticate(req.body.email, req.body.password);
    if(user){
      req.session.userId = user._id;
      return res.redirect("/")
    }else{
      res.render("login", {error: "Has introducido un email o un password incorrecto."});
    }
  }catch(err){
    return next(err)
  }
});

app.listen(3000, () => console.log('listeng on port 3000'));