// import { response } from "express";


function handleSubmit(event) {

    console.log("::: Form Submitted :::")
    event.preventDefault()

    let formText = document.getElementById('text-entry').value;
    document.getElementById('results').innerHTML = '';
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
            document.getElementById('results').innerHTML = data.agreement;
        }catch(error) {
            console.log('error', error)
        }
    }

    postData('http://localhost:8081/userInput', {
        userInput: formText
    })
}

export { handleSubmit }