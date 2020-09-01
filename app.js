const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', 'views');

app.get('/', (req, res) => {
  res.render('index')
});

app.get('/prueba', (req, res) => {
  res.render('poll')
});
app.listen(3000, () => console.log('listeng on port 3000'));