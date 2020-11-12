<template>
    <div class="flex flex-wrap flex-col justify-center">
        <CardDetails v-if="previewCard !== null" />
        <DeckBuilderMeta :deck="deck" class="sticky top-0 z-10"/>
        <CardSearch :on-search="searchCards" :search-query="searchQuery" class="container mx-auto" />
        <DeckPreview :deck="deckCards" v-if="previewDeck"/>
        <div class="flex container mx-auto">
            <SearchList :cards="cards" class="w-full lg:w-3/5"/>
        </div>
    </div>
        <!-- <CardDetails v-if="previewCard !== null" />
        <div class="w-full flex lg:sticky top-0 z-10 mb-2">
            <CardSearch :on-search="searchCards" :search-query="searchQuery" />
        </div>
        <div class="block lg:hidden w-full sticky top-0 flex justify-between p-1 bg-gray-800 p-2 mb-2 z-10">
            <input v-model="deckTitle" type="text" 
            class="text-base p-1 rounded focus:outline-none" placeholder="Enter deck name...">
            <button @click="saveDeck" class="text-base text-white block bg-white bg-green-400 hover:bg-green-500 px-3 py-1 rounded focus:outline-none">
                save
            </button>
        </div>
        <div class="flex w-full container mx-auto">
            <CardList 
                content-display="w-1/2 p-1 md:p-3 md:w-1/4 lg:p-6 lg:w-1/4" 
                card-controls="" 
                :cards="cards" 
                class="w-full flex flex-wrap items-center lg:justify-left lg:w-4/5 p-2"
                :get-copies="getCopies"
            />
            <div class="hidden lg:block lg:w-1/5 h-64 sticky top-custom flex flex-col ">
                <div class="flex justify-between p-1 bg-gray-800 p-2 mb-2">
                    <input v-model="deckTitle" type="text" 
                    class="text-base p-1 rounded focus:outline-none" placeholder="Enter deck name...">
                    <button @click="saveDeck" class="text-base text-white block bg-white bg-green-400 hover:bg-green-500 px-3 py-1 rounded focus:outline-none">
                        save
                    </button>
                </div>
                <DeckList :deck="deck" class="w-full  "/>
            </div>
        </div>
        
    </div> -->
</template>

<script>
import {computed, onBeforeMount, onMounted, reactive, ref, toRefs} from 'vue';
import SearchList from '../components/SearchList';
// import CardList from '../components/CardList';
import CardSearch from '../components/CardSearch';
import DeckBuilderMeta from '../components/DeckBuilderMeta';
import DeckPreview from '../components/DeckPreview';
// import DeckList from '../components/DeckList'
import CardDetails from '../components/CardDetails';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

export default {
    props: {
        game: String
    },
    components: {
        // CardList,
        // DeckList,
        CardSearch,
        CardDetails,
        DeckBuilderMeta,
        SearchList,
        DeckPreview
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
        const previewDeck = computed(() => store.state.previewDeck);

        const scroll = () => {
            window.onscroll= async () => {
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

                if (bottomOfWindow && store.state.canLoadMore) {
                    searchQuery.skip = currentPage.value + 1;
                    currentPage.value += 1;
                    await store.dispatch('loadMore', searchQuery);
                }
            }
        }

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

        onMounted(() => {
            scroll();
        })

        const saveDeck = async () => {
            try {
                await store.dispatch('save', deckTitle.value);
                router.push({name: 'ViewDeck', params: {code: store.state.deckCode}});
            } catch(e) {
                store.commit('errorState', {message: e.message});
            }
        }

        const deckCards = computed(() => {
            const set = new Set();
            return deck.value.reduce((res,card) => {
                if(!set.has(card._id)) {
                    set.add(card._id, card);
                    res.push(card)
                }

                return res
            }, []);
        });

        const searchCards = async () => {
            loading.value = true;
            try {
                currentPage.value = 0;
                searchQuery.skip = 0;
                await store.dispatch('loadCards', searchQuery);
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
            loading,
            previewCard,
            searchCards,
            searchQuery,
            deckCards,
            previewDeck
        }
  }
}
</script>
<style>
@layer utilities {
    @responsive {
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