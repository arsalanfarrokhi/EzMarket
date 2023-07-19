import axios from "axios";

const instance = axios.create({
    baseURL: 'https://us-central1-ezmarket-6fd5d.cloudfunctions.net/api' //THE API (cloud function) URL
});

export default instance;

//http://localhost:5001/ezmarket-6fd5d/us-central1/api