<template>
    <div class="flex container mx-auto flex-wrap justify-left lg:flex-row flex-col-reverse">
        <div class="lg:w-3/5 flex flex-col p-1">
            <CardList 
                content-display="w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3" 
                card-controls="" 
                :cards="cards" 
                class=" w-full flex flex-wrap overflow-x-hidden overflow-y-auto lg:search-results"
                :get-copies="getCopies"/>
            <div class="w-full p-1 flex justify-between rounded-md">
                <span class="text-white font-bold text-lg py-2 px-5 bg-gray-600 mr-1">{{deck.length}} / 50</span>
                <div class="flex">
                    <input type="text" v-model="deckTitle" placeholder="enter deck name...">
                    <button type="submit" 
                        class="w-24 text-base font-bold px-4 py-2 bg-green-500 text-white hover:bg-green-600 focus:bg-green-900 focus:outline-none"
                        @click="saveDeck">SAVE</button>
                </div>

            </div>
        </div>
        <div class="w-full lg:w-2/5 flex flex-col p-1">
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
            height: 50rem;
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