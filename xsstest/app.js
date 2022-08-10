const express = require('express')
const path = require('path');
const app = express()
const port = 3000
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/xss_test', (req,res) =>{
    res.render('xss_test.ejs')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})