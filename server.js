const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const api = require('./routes/api');
const app = express();

const PORT = 3000

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type', 'Accept', 'Authorization"
        );
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Headers', 'PUT, POST, PATCH, DELETE, GET')
            return res.status(200).json({});
        }
        next()
})

app.use('/api', api)
app.get('/', (req, res) => {
    res.send('Hello World test!')
  })

app.listen(PORT, () => {
    console.log('Server running on localhost: ' + PORT);
})