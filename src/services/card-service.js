import axios from 'axios';
const URL = 'https://decks-builder.com/cards';


export const loadAllCards = async (query) => {
    return axios.get(`${URL}`,{
        params: query
    });
}

export const searchForCards = async (filters) => {
    return axios.get(`${URL}?${filters}`)
}