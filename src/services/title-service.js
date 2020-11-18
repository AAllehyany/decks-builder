import axios from 'axios';

const URL = 'http://localhost:3000/titles';

export const getAllTitles = async () => {
    return axios.get(URL);
}