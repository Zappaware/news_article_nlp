// import { response } from "express";


function handleSubmit(event) {

    console.log("::: Form Submitted :::")
    event.preventDefault()

    let formText = document.getElementById('text-entry').value;
    document.getElementById('user_input').innerHTML = formText;

    // POST request to server
    const postData = async (url = '', data = {}) => {

        const options = {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }

        const response = await fetch(url, options);

        try {
            const data = await response.json();
            console.log(data);
        }catch(error) {
            console.log('error', error)
        }
    }

    // console.log("User input posted to the server");

    postData('http://localhost:8081/userInput', {
        userInput: formText
    })

    setTimeout(function () {
        updateUI();
    }, 4000);

    const updateUI = async () => {
        const request = await fetch('/all');
        try {
            const allData = await request.json();
            console.log(allData);
            document.getElementById('results').innerHTML = allData.agreement;
        }catch(error){
            console.log('error', error);
        }
        console.log('AFTER GET');
    }

}


export { handleSubmit }