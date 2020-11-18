import axios from 'axios'
const URL = 'http://localhost:3000/games';


export const getGameAndForm = async (code) => {
    return axios.get(`${URL}/${code.toUpperCase()}`)
}