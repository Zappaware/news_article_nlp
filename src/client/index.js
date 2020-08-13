// import { checkForName } from './js/nameChecker'
// import { handleSubmit } from './js/formHandler'
import 'bootstrap'

import './styles/resets.scss'
import './styles/base.scss'
import './styles/form.scss'
import './styles/footer.scss'
import './styles/header.scss'
import './styles/overrides.scss'
import { response } from 'express'

export {
    response
}

// let baseURL = 'https://api.meaningcloud.com/sentiment-2.1=';
// let input = document.getElementById('text-entry').value;
// // This is temporarily here as we are not supposed to have this on the client side

// const inputButton = document.getElementById('input-button');
// inputButton.addEventListener('click', performAction);

// function performAction () {

//     getApiKey()
//     .then(function(data){
//         let myData = {
//             key: data.key,
//             lang: 'en',
//             url: formText
//         }
//     })

//     getTextAnalysis(baseURL, myData.key, input)
//     .then(function(data){
//         document.getElementById('results').innerHTML = data.agreement;
//     })
// }

// // API Call
// const getTextAnalysis = async (baseURL, apiKey, input) => {

//     const response = await fetch(baseURL+apiKey+'&of'+input.json());
//     try {
//         const textData = response.json();
//         return textData;
//     }catch(error) {
//         console.log('ERROR', error);
//     }
// }


// const getApiKey = async () => {
//     const request = await fetch('/api');
//     try {
//         const api_key = await request.json();
//         console.log(api_key);
//         return api_key;
//     }catch(error) {
//         console.log('ERROR', error);
//     }
// }



// console.log(checkForName);

// alert("I EXIST")
// console.log("CHANGE!!");

// export {
//     checkForName,
//     handleSubmit
// }