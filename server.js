const express = require('express');
const bodyParser = require('body-parser')
const api = require('./routes/api');
const app = express();

const PORT = 3000

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.use('/api', api)
app.get('/', (req, res) => {
    res.send('Hello World test!')
  })

app.listen(PORT, () => {
    console.log('Server running on localhost: ' + PORT);
})