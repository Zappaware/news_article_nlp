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


// app.get('/test', function (request, response) {
//     response.send(mockAPIResponse);
// })



// API work below

// Empty JS object
// let newInput = {};
let projectData = {};
let baseURL = 'https://api.meaningcloud.com/sentiment-2.1?key=';

let apiKey = process.env.API_KEY;

// Posting user response from client to server
app.post('/userInput', function (request, response) {

    // console.log(request);

    let userInput = {
        input: request.body.userInput,
        lang: 'en'
    }
    response.send('POST RECEIVED');

    console.log('User Input: ' + userInput.input);
    console.log('API KEY: ' + apiKey);
    console.log(baseURL+apiKey+'&of=json&txt='+userInput.input+'.&lang=en');


    getTextAnalysis(baseURL, apiKey, userInput.input)
    .then(function(data) {
        postData('http://localhost:8081/addTextData', {
            agreement: data.agreement
        })
        // console.log(data.agreement);
    })

    const postData = async (url = '', data = {}) => {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        try {
            const newData = await response.json();
            console.log('NEW DATA: ' + newData.agreement);
        }catch(error) {
            console.log('error', error);
        }
    }
})


const getTextAnalysis = async (baseURL, apiKey, input) => {
    console.log('FETCH URL: '+baseURL+apiKey+'&of=json&txt='+input+'.&lang=en');

    // This fetch is currently where this are going wrong - invalid URL
    const response = await fetch(baseURL+apiKey+'&of=json&txt='+input+'.&lang=en');
    try {
        const newData = await response.json();
        console.log(newData);
        console.log(newData.agreement);
        return newData;
    }catch(error) {
        console.log('ERROR', error);
    }
}

// Posting API results
app.post('/addTextData', function (request, response) {
    let newEntry = {
        agreement: request.body.agreement,
    }
    console.log('NEW ENTRY: ' + newEntry.agreement);
    projectData = newEntry;
    response.send(projectData);
})

app.get('/all', function (request, response) {
    console.log('BEING SENT TO CLIENT ' + projectData.agreement);
    response.send(projectData);
    console.log('Response Sent');
})




// app.get('/api', function (request, response) {
//     response.send({key: application_key});
// })

