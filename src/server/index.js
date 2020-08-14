const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js');
const { fileURLToPath } = require('url');
const { text } = require('body-parser');

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})



// Empty JS object
let dataMain = {}

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

const application_key = process.env.API_KEY;

app.get('/api', function (request, response) {
    response.send({key: application_key});
})

app.get('/all', sendData);

function sendData (request, response) {
    response.send(dataMain);
}

app.post('/addText', function (request, response) {
    let newEntry = {
        agreement: request.body.agreement,
        subjectivity: request.body.subjectivity
    }
    dataMain = newEntry;
    response.send(dataMain);
})
