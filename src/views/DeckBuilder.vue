<template>
    <div class="flex container mx-auto flex-wrap justify-left p-2">
        <div class="w-full flex sticky top-0 z-10 mb-2">
            <CardSearch class="rounded-lg"/>
        </div>
            <!-- <div class="flex w-full bg-white border-l-8 border-r-8 border-blue-900 p-2 mb-1 justify-between rounded items-center sticky top-0 z-50">
                <h3 class="text-lg text-blue-900 font-normal uppercase">deck: <b class="text-green-500">{{deck.length}}</b> / 50</h3>
                <div class="flex justify-between p-1 border-b border-blue-800">
                    <input v-model="deckTitle" type="text" 
                    class="w-32 text-base p-1 rounded focus:outline-none" placeholder="Enter deck name...">
                    <button @click="saveDeck" class="text-base text-white block w-1/3 bg-white bg-green-400 hover:bg-green-500 px-3 py-1 rounded focus:outline-none">
                        save
                    </button>
                </div>
            </div>
            <div class="w-full flex flex-wrap overflow-x-hidden overflow-y-auto lg:search-results lg:max-w-screen-md justify-center" v-if="cards.length === 0">
                <span class="text-lg text-red-800 font-bold uppercase p-8">No results </span>
            </div> -->
        <div class="flex w-full">
            <CardList 
                content-display="card m-5 lg:lg-card bg-black rounded-lg" 
                card-controls="" 
                :cards="cards" 
                class="w-full flex flex-wrap lg:w-3/4 p-2"
                :get-copies="getCopies"
            />
            <div class="hidden lg:block lg:w-1/4 h-64 sticky top-custom ">
                <DeckList :deck="deck" class="w-full  "/>
            </div>
        </div>
        
    </div>
</template>

<script>
import {computed, onBeforeMount, ref, toRefs} from 'vue';
import CardList from '../components/CardList';
import CardSearch from '../components/CardSearch';
import DeckList from '../components/DeckList'
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

export default {
    props: {
        game: String
    },
    components: {
        CardList,
        DeckList,
        CardSearch
    },
    setup(props) {
        const {game} = toRefs(props);
        const store = useStore();
        const router = useRouter();
        const cards = computed(() => store.state.searchResults);
        const deck = computed(() => store.state.currentDeck);
        const deckTitle = ref('');
        const loading = ref(false);

        onBeforeMount(async () => {
            loading.value = true;
            try {
                await store.dispatch('loadCards', {
                    game: game.value,
                    skip: 0,
                });
            } catch(e) {
                console.log(e);
            } finally {
                loading.value = false;
            }
        });

        const saveDeck = async () => {
            console.log(deckTitle.value)
            try {
                await store.dispatch('save', deckTitle.value);
                router.push({name: 'ViewDeck', params: {code: store.state.deckCode}});
            } catch(e) {
                console.log("ERRORRRR", e);
            }
        }

        const getCopies = (card) => {
            return store.state.currentDeck.filter(c => c._id === card._id).length
        }

        return {
            cards,
            deck,
            saveDeck,
            deckTitle,
            getCopies,
            loading
        }
  }
}
</script>
<style>
@layer utilities {
    @responsive {
        .search-results {
            height: 550px;
            scrollbar-width: 10px;
            scrollbar-color: #2f3030 transparent;
        }

        .search-results::-webkit-scrollbar {
            width: 10px;
        }

        .search-results::-webkit-scrollbar-track {
            background: transparent;
        }

        .search-results::-webkit-scrollbar-thumb {
            background-color: #2f3030;
            border-radius: 20px;
            border: 1px solid #000;
        }

        .card {
            width: 200px;
            max-height: 279px;
        }

        .lg-card {
            width: 180px;
            max-height: 252px;
        }

        .top-custom {
            top: 5rem;
        }

    }


}
</style>