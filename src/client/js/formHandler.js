import { response } from "express";

let baseURL = 'https://api.meaningcloud.com/sentiment-2.1=';
let apiKey = '';

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('text-entry').value

    console.log("::: Form Submitted :::")

    getApiKey()
    .then(function(data){
        apiKey = data.key;
    })

    const getApiKey = async () => {
        const request = await fetch('/api');
        try {
            const data = await request.json();
            console.log(data);
            return data;
        }catch(error) {
            console.log('ERROR', error);
        }
    }

    getTextAnalysis(baseURL, apiKey, formText)
    .then(function(data) {
        postData('/addText', {
            agreement: data.agreement,
            sub: data.subjectivity
        })
    })
    .then(function() {
        updateUI();
    })
    


    // API Call
    const getTextAnalysis = async (baseURL, apiKey, input) => {

        const response = await fetch(baseURL+apiKey+'&of'+input);
        try {
            const textData = response.json();
            return textData;
        }catch(error) {
            console.log('ERROR', error);
        }
    }

    // POST request to server
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
        }catch(error) {
            console.log('error', error);
        }
    }

    const updateUI = async () => {
        const request = await fetch('/all');
        try {
            const allData = await response.json();
            console.log(allData);
            document.getElementById('results').innerHTML = allData.agreement;
        }catch(error){
            console.log('error', error);
        }
        console.log('AFTER GET');
    }

}


export { handleSubmit }