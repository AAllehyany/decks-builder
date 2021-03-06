import { createStore } from 'vuex'
import {loadAllCards} from '../services/card-service';
import { getGameAndForm } from '../services/game-service';
import {validAdd, saveDeck, loadDeck} from '../services/validation-service';

export default createStore({
    state: {
        searchResults: [],
        searchFilters: {},
        maxCopies: 4,
        errorMsg: null,
        currentDeck: [],
        cardError: {},
        deckInfo: {},
        deckCode: '',
        previewCard: null,
        loading: false,
        canLoadMore: true,
        previewDeck: false,
        currentGame: null
    },
    mutations: {
        cardsLoaded(state, payload) {
            state.searchResults = payload;
        },

        addCardsToResult(state, payload) {
            state.searchResults.push(...payload);
        },

        errorState(state, payload) {
            //state.hasError = true;
            state.errorMsg = payload;
        },

        clearError(state) {
            state.hasError = false;
            state.errorMsg = null;
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
        },

        setCanLoad(state, value) {
            state.canLoadMore = value;
        },

        setPreviewDeck(state, value) {
            state.previewDeck =value;
        },

        resetBuilder(state) {
            state.currentDeck = [];
            state.deckCode = '';
        },

        setGameAndForm(state, payload) {
            state.currentGame = payload;
        }

    },
    actions: {
        async loadCards({commit}, query) {
            try {
                commit('setLoading', true);
                commit('setCanLoad', true);
                const cards = await loadAllCards(query);
                commit('cardsLoaded', cards.data);
            } catch(e) {
                if(e.response) {
                    commit('errorState', e.response.data);
                } else if(e.request) {
                    commit('errorState', {message: 'Network error!!'});
                } else {
                    console.log(e);
                }
            } finally {
                commit('setLoading', false);
            }
        },
        async loadMore({commit}, query) {
            try {
                commit('setLoading', true);
                const cards = await loadAllCards(query);
                if(cards.data.length < 1) {
                    commit('setCanLoad', false)
                } else {
                    commit('addCardsToResult', cards.data);
                }
            } catch(e) {
                if(e.response) {
                    commit('errorState', e.response.data);
                } else if(e.request) {
                    commit('errorState', {message: 'Network error!!'});
                } else {
                    console.log(e);
                }
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
                if(e.response) {
                    commit('errorState', e.response.data);
                } else if (e.request) {
                    commit('errorState', {message: 'Network error'})
                } else {
                    console.log(e);
                }
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
                if(e.response) {
                    commit('errorState', e.response.data);
                } else if(e.request) {
                    commit('errorState', {message: 'Network error!!'});
                } else {
                    console.log(e);
                }
            } finally {
                commit('setLoading', false);
            }
        },

        async loadGameAndForm({commit}, code) {
            try {
                commit('setLoading', true);
                const game = await getGameAndForm(code);
                commit('setGameAndForm', game.data);
            } catch(e) {
                if(e.response) {
                    commit('errorState', e.response.data);
                } else if(e.request) {
                    commit('errorState', {message: 'Network error!!'});
                } else {
                    console.log(e);
                }
            } finally {
                commit('setLoading', false);
            }
        }
    },
    modules: {
    }
})
