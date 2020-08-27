const dotenv = require('dotenv');
dotenv.config();


var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js');
const { fileURLToPath } = require('url');
const text = require('body-parser');
const { post } = require('jquery');
const fetch = require('node-fetch');
// const cors = require('cors');
const app = express();

app.use(express.static('dist'))
app.use(text.urlencoded({ extended: false }))
app.use(text.json())
// app.use(cors);

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})


let baseURL = 'https://api.meaningcloud.com/sentiment-2.1?key=';
let apiKey = process.env.API_KEY;

// Posting user response from client to server
app.post('/api', function (request, response) {

    let userInput = {
        input: request.body.userInput,
        lang: 'en'
    }

    console.log('User Input: ' + userInput.input);
    console.log(baseURL+apiKey+'&of=json&txt='+userInput.input+'.&lang=en');

    getTextAnalysis(baseURL, apiKey, userInput.input)
    .then(function(data){
        response.send(data);
    })
})


const getTextAnalysis = async (baseURL, apiKey, input) => {
    console.log('FETCH URL: '+baseURL+apiKey+'&of=json&txt='+input+'.&lang=en');

    const response = await fetch(baseURL+apiKey+'&of=json&txt='+input+'.&lang=en');
    try {
        const newData = await response.json();
        return newData;
    }catch(error) {
        console.log('ERROR', error);
    }
}

