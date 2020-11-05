<template>
    <div class="flex container mx-auto flex-wrap justify-left lg:flex-row flex-col-reverse">
        <div class="lg:w-3/5 flex flex-col p-1">
            <div class="flex w-full border-l-8 border-r-8 border-blue-900 p-2 mb-1 justify-between rounded items-center">
                <h3 class="text-lg text-blue-900 font-normal uppercase">deck: <b class="text-green-500">{{deck.length}}</b> / 50</h3>
                <div class="flex justify-between p-1 border-b border-blue-800">
                    <input v-model="deckTitle" type="text" class="appearance-none " placeholder="Enter deck name...">
                    <button @click="saveDeck" class="text-base text-white block w-1/3 bg-white bg-green-400 hover:bg-green-500 p-2 rounded focus:outline-none">search</button>
                </div>
            </div>
            <CardList 
                content-display="w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/4" 
                card-controls="" 
                :cards="cards.slice(0,12)" 
                class=" w-full flex flex-wrap overflow-x-hidden overflow-y-auto lg:search-results"
                :get-copies="getCopies"/>
        </div>
        <div class="w-full lg:w-1/5 flex flex-col p-1">
            <CardSearch />
        </div>
    </div>
</template>

<script>
import {computed, onMounted, ref, toRefs} from 'vue';
import CardList from '../components/CardList';
import CardSearch from '../components/CardSearch';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

export default {
    props: {
        game: String
    },
    components: {
        CardList,
        CardSearch
    },
    setup(props) {
        const {game} = toRefs(props);
        const store = useStore();
        const router = useRouter();
        const cards = computed(() => store.state.searchResults);
        const deck = computed(() => store.state.currentDeck);
        const deckTitle = ref('');

        onMounted(async () => {
            await store.dispatch('loadCards', `game=${game.value}`);
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
        }
  }
}
</script>
<style scoped>
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
    }


}
</style>