import axios from "axios";

const api = axios.create({ 
    baseURL: "http://localhost:3001/api", 
    headers: {
        "Content-Type": "application/json",
    }
});

api.get("/produtos").then(response => console.log(response.data));