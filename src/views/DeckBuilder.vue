<template>
    <div class="flex mx-auto flex-wrap justify-center p-2">
        <CardDetails v-if="previewCard !== null" />
        <div class="hidden lg:block w-full flex sticky top-0 z-10 mb-2">
            <CardSearch class="rounded-lg" :on-search="searchCards" :search-query="searchQuery" />
        </div>
        <div class="flex w-full container mx-auto">
            <CardList 
                content-display="w-1/2 p-1 md:p-3 md:w-1/3 lg:p-6 lg:w-1/3 rounded-lg" 
                card-controls="" 
                :cards="cards" 
                class="w-full flex flex-wrap items-center lg:justify-left lg:w-2/3 p-2"
                :get-copies="getCopies"
            />
            <div class="hidden lg:block lg:w-1/3 h-64 sticky top-custom flex flex-col ">
                <div class="flex justify-between p-1 bg-gray-200 p-2 mb-2 rounded-lg">
                    <input v-model="deckTitle" type="text" 
                    class="text-base p-1 rounded focus:outline-none" placeholder="Enter deck name...">
                    <button @click="saveDeck" class="text-base text-white block bg-white bg-green-400 hover:bg-green-500 px-3 py-1 rounded focus:outline-none">
                        save
                    </button>
                </div>
                <DeckList :deck="deck" class="w-full  "/>
            </div>
        </div>
        
    </div>
</template>

<script>
import {computed, onBeforeMount, reactive, ref, toRefs} from 'vue';
import CardList from '../components/CardList';
import CardSearch from '../components/CardSearch';
import DeckList from '../components/DeckList'
import CardDetails from '../components/CardDetails';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

export default {
    props: {
        game: String
    },
    components: {
        CardList,
        DeckList,
        CardSearch,
        CardDetails
    },
    setup(props) {
        const {game} = toRefs(props);
        const store = useStore();
        const router = useRouter();
        const cards = computed(() => store.state.searchResults);
        const deck = computed(() => store.state.currentDeck);
        const deckTitle = ref('');
        const loading = ref(false);
        const previewCard = computed(() => store.state.previewCard);
        const currentPage = ref(0);
        const searchQuery = reactive({});

        onBeforeMount(async () => {
            loading.value = true;
            try {
                await store.dispatch('loadCards', {
                    game: game.value,
                    skip: currentPage.value,
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

        const searchCards = async () => {
            loading.value = true;
            try {
                await store.dispatch('loadCards', searchQuery);
                currentPage.value = 0;
            } catch(e) {
                console.log(e);
            } finally {
                loading.value = false;
            }
        }

        return {
            cards,
            deck,
            saveDeck,
            deckTitle,
            getCopies,
            loading,
            previewCard,
            searchCards,
            searchQuery
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