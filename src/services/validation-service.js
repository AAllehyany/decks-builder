import axios from 'axios';
const URL = 'https://decks-builder.com/decks';

export const validAdd = (deck, card) => {
    const deckToBe = deck.concat([card]);
    return true || (deckToBe.length <= 50) && validateWeissDeck(deckToBe);
}


export const validateWeissDeck = (deckList)=> {
    // if(deckList.length != 50) 
    //     return false;
    
    const numClimaxes = deckList.reduce((p, c) => c.card_type == 2 ? (p + 1) : p, 0);
    if(numClimaxes > 8) {
        return false;
    }

    const nameCopies = {};
    for(const card of deckList){

        if(nameCopies[card.name] === undefined) {
            nameCopies[card.name] = 0;
        }

        nameCopies[card.name] += 1;

        if(nameCopies[card.name] > 4) {
            return false
        }
    }

    return true;
}

export const saveDeck = async (deck) => {
    return axios.post(`${URL}/save`, deck);
}

export const loadDeck = async(code) => {
    return axios.get(`${URL}/view/${code}`);
}