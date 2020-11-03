<template>
    <div class="flex container mx-auto flex-wrap justify-left lg:flex-row flex-col-reverse">
        <div class="lg:w-3/5 flex flex-col p-1">
            <div class="w-full bg-yellow-300 mb-1 p-2 flex justify-between rounded-md">
                <span class="text-white font-bold text-lg py-2 px-5 bg-gray-600 mr-1">{{deck.length}} / 50</span>
                <div class="flex">
                    <input type="text" v-model="deckTitle">
                    <button type="submit" 
                        class="w-24 text-base font-bold px-4 py-2 bg-green-500 text-white hover:bg-green-600 focus:bg-green-900 focus:outline-none"
                        @click="saveDeck">SAVE</button>
                </div>

            </div>
            <CardList card-controls="" :cards="cards" class=" w-full flex flex-wrap overflow-x-hidden overflow-y-auto lg:search-results"/>
        </div>
        <div class="w-full lg:w-2/5 flex flex-col p-1">
            <CardSearch />
        </div>
    </div>
</template>

<script>
import {computed, onMounted, ref} from 'vue';
import CardList from '../components/CardList';
import CardSearch from '../components/CardSearch';
import {useStore} from 'vuex';


export default {
    components: {
        CardList,
        CardSearch
    },
    setup() {
        const store = useStore();
        const cards = computed(() => store.state.searchResults);
        const deck = computed(() => store.state.currentDeck);
        const deckTitle = ref('');

        onMounted(async () => {
            await store.dispatch('loadCards');
        });

        const saveDeck = async () => {
            console.log(deckTitle.value)
            await store.dispatch('save', deckTitle.value);
        }

        return {
            cards,
            deck,
            saveDeck,
            deckTitle
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