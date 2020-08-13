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
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

const application_key = process.env.API_KEY;

// app.get('/api', function (request, response) {
//     response.send({key: application_key});
// })



let baseURL = 'https://api.meaningcloud.com/sentiment-2.1=';
let input = document.getElementById('text-entry').value;

const inputButton = document.getElementById('input-button');
inputButton.addEventListener('click', performAction);

function performAction () {
    console.log('HEHEHEHEH');

    getApiKey()
    .then(function(data){
        let myData = {
            key: data.key,
            lang: 'en',
            url: formText
        }
    })

    getTextAnalysis(baseURL, myData.key, input)
    .then(function(data){
        document.getElementById('results').innerHTML = data.agreement;
    })
}

// API Call
const getTextAnalysis = async (baseURL, apiKey, input) => {

    const response = await fetch(baseURL+apiKey+'&of'+input.json());
    try {
        const textData = response.json();
        return textData;
    }catch(error) {
        console.log('ERROR', error);
    }
}


const getApiKey = async () => {
    const request = await fetch('/api');
    try {
        const api_key = await request.json();
        console.log(api_key);
        return api_key;
    }catch(error) {
        console.log('ERROR', error);
    }
}



// console.log(checkForName);

// alert("I EXIST")
// console.log("CHANGE!!");

// export {
//     checkForName,
//     handleSubmit
// }