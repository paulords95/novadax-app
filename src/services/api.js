import axios from "axios";

const apiDax = axios.create({
  baseURL: "https://api.novadax.com",
});

const apiLocal = axios.create({
  baseURL: "http://192.168.0.11:1234",
});

module.exports = { apiDax, apiLocal };
