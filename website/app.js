/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let ApiKey = "847cf16404a6d38402c05e41ae69d62b";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    console.log("iam here")
    const postCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    console.log(newDate);
    getTemperature(baseURL, postCode, ApiKey)
        .then(function (data) {
            // Add data to the request 
            postData('http://localhost:3000/addWeatherData', { temperature: data.main.temp, date: newDate, user_response: feelings })
                // then updates UI
                .then(function () {
                    updateUI()
                })
        })
}


// GET Temp Functions 
const getTemperature = async (baseURL, code, ApiKey) => {
    const response = await fetch(baseURL + code + ',us' + '&APPID=' + ApiKey)
    console.log(response);
    try {
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.log('error', error);
    }
}


// POST the Reuest data 
const postData = async (url = '', data = {}) => {
    const postRequest = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await postRequest.json();
        console.log(newData);
        return newData;
    }
    catch (error) {
        console.log('Error', error);
    }
}


// Update user interface
const updateUI = async () => {
    const request = await fetch('http://localhost:3000/all');
    try {
        const allData = await request.json();
        console.log(allData);
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.user_response;
    }
    catch (error) {
        console.log('error', error);
    }
}