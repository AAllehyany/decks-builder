import { createStore } from 'vuex'
import {loadAllCards} from '../services/card-service';
import {validAdd, saveDeck} from '../services/validation-service';

export default createStore({
    state: {
        searchResults: [],
        searchFilters: {},
        maxCopies: 4,
        errorMsgs: {},
        currentDeck: [],
        cardError: {},
    },
    mutations: {
        cardsLoaded(state, payload) {
            state.searchResults = payload;
        },

        errorState(state, payload) {
            state.errorMsgs = payload;
        },

        cardAddedToDeck(state, payload) {
            state.currentDeck.push(payload);
        },

        cardRemovedFromDeck(state, payload) {
            const idx = state.currentDeck.findIndex(c => c._id === payload._id);
            if(idx !== -1) {
                state.currentDeck.splice(idx, 1);
            }
        },

        deckSaved(state) {
            state.currentDeck = [];
        }
    },
    actions: {
        async loadCards({commit}) {
            try {
                const cards = await loadAllCards();
                commit('cardsLoaded', cards.data);
            } catch(e) {
                console.log(e);
            }
        },
        addCardToDeck({state, commit}, card) {
            const canAdd = validAdd(state.currentDeck, card);
            if(canAdd) {
                commit('cardAddedToDeck', card);
            }
        },
        removeCardFromDeck({commit}, card) {
            commit('cardRemovedFromDeck', card);
        },
        async save({state, commit}, name) {
            try {
                const data = {
                    name,
                    game: 'WS',
                    cards: state.currentDeck.map(c => c._id)
                }
                const resp = await saveDeck(data);
                commit('deckSaved');
                console.log(resp.data);
            } catch(e) {
                console.log(e);
            }
        }
    },
    modules: {
    }
})
