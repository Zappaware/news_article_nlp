// import { response } from "express";

let baseURL = 'https://api.meaningcloud.com/sentiment-2.1=';
let apiKey = {};

function handleSubmit(event) {

    console.log("::: Form Submitted :::")
    event.preventDefault()

    let formText = document.getElementById('text-entry').value;

    // POST request to server
    const postData = async (url = '', data = {}) => {
        console.log("Usscsdcdc");

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
            console.log('error', error)
        }
    }

    console.log("User input posted to the server");

    postData('/userInput', {
        userInput: formText
    })

    
    

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