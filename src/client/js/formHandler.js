// import { response } from "express";


function handleSubmit(event) {

    console.log("::: Form Submitted :::")
    event.preventDefault()

    let formText = document.getElementById('text-entry').value;
    console.log(formText);
    document.getElementById('result1').innerHTML = '';
    document.getElementById('result2').innerHTML = '';
    document.getElementById('result3').innerHTML = '';
    document.getElementById('user_input').textContent = formText;

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
            document.getElementById('result1').innerHTML = data.agreement;
            document.getElementById('result2').innerHTML = data.subjectivity;
            document.getElementById('result3').innerHTML = data.confidence;
        }catch(error) {
            console.log('error', error)
        }
    }

    postData('http://localhost:8081/api', {
        userInput: formText
    })
}

export { handleSubmit }