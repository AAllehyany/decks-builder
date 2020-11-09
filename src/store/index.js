import { createStore } from 'vuex'
import {loadAllCards} from '../services/card-service';
import {validAdd, saveDeck, loadDeck} from '../services/validation-service';

export default createStore({
    state: {
        searchResults: [],
        searchFilters: {},
        maxCopies: 4,
        errorMsgs: {},
        currentDeck: [],
        cardError: {},
        deckInfo: {},
        deckCode: '',
        previewCard: null,
        loading: false,
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

        deckSaved(state, payload) {
            state.currentDeck = [];
            state.deckCode = payload.code;
        },

        deckLoaded(state, deck) {
            state.deckInfo = deck;
        },

        setPreviewCard(state, card) {
            state.previewCard = card;
        },

        setLoading(state, value) {
            state.loading = value;
        }
    },
    actions: {
        async loadCards({commit}, query) {
            try {
                commit('setLoading', true);
                const cards = await loadAllCards(query);
                commit('cardsLoaded', cards.data);
            } catch(e) {
                console.log(e);
            } finally {
                commit('setLoading', false);
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
                commit('setLoading', true);
                const data = {
                    name,
                    game: 'WS',
                    cards: state.currentDeck.map(c => c._id)
                }
                const resp = await saveDeck(data);
                commit('deckSaved', resp.data);
            } catch(e) {
                console.log(e);
            } finally {
                commit('setLoading', false);
            }
        },

        async loadDeckCards({commit}, code) {
            try {
                commit('setLoading', true);
                const cards = await loadDeck(code);
                commit('deckLoaded', cards.data);
            } catch(e) {
                console.log(e);
            } finally {
                commit('setLoading', false);
            }
        }
    },
    modules: {
    }
})
