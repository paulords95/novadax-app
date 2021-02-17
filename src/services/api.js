import axios from "axios";

const apiDax = axios.create({
  baseURL: "https://api.novadax.com",
});

const apiLocal = axios.create({
  baseURL: "http://191.252.205.198:9433",
});

module.exports = { apiDax, apiLocal };
