import axios from 'axios';
const URL = 'http://134.209.131.230:5000/cards';


export const loadAllCards = async (query) => {
    return axios.get(`${URL}`,{
        params: query
    });
}

export const searchForCards = async (filters) => {
    return axios.get(`${URL}?${filters}`)
}