import axios from 'axios';
const URL = 'http://localhost:3000/weiss-cards';


export const loadAllCards = async (query) => {
    return axios.get(`${URL}?${query}`);
}

export const searchForCards = async (filters) => {
    console.log(filters);
    // ... filter and sort/etc
}