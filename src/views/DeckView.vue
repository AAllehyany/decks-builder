<template>
    <div class="container mx-auto ">
        <CardDetails v-if="previewCard !== null" />
        <div class="flex justify-center">
            <div class="flex w-full max-w-screen-md flex-col">
                <div class="flex justify-between bg-gray-900 p-2 items-center">
                    <span class="text-gray-200 text-base">{{deck.name}}</span>
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="fill-current text-yellow-500 w-4 h-4 mr-2">
                            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                        <span class="text-gray-200 text-base">{{deck.code}}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="fill-current text-yellow-500 w-4 h-4 ml-2">
                            <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
                <DeckCardList 
                    :cards="sorted" class="items-center p-1 bg-gray-700" 
                    :get-copies="getCopies"
                />
            </div>
        </div>
        
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex'
import DeckCardList from '../components/DeckCardList';
import CardDetails from '../components/CardDetails';
export default {
    props: {
        code: String
    },
    components: {DeckCardList, CardDetails},
    setup(props) {
        const store = useStore();
        const deck = computed(() => store.state.deckInfo);
        const previewCard = computed(() => store.state.previewCard);
        onMounted(async () => {
            await store.dispatch('loadDeckCards', props.code);
        });

        const getCopies = (card) => {
            return store.state.deckInfo.cards.filter(c => c._id === card._id).length;
        }


        const makeUnique = (cards) => {
            if(cards === undefined) return;
            const uni = cards.reduce((p, c) => {
                const name = c._id;
                if(p[name] === undefined) {
                    p[name] = c;
                }
                return p
            }, {});
            return Object.values(uni);
        }

        const sorted = computed(() => {
            if(store.state.deckInfo.cards === undefined) return [];
            const cards = store.state.deckInfo.cards;
            return [...cards].sort((a,b) => a.card_type - b.card_type);
        })

        return {
            deck,
            getCopies,
            makeUnique,
            previewCard,
            sorted
        }
    }
}
</script>
<style>
@layer utilities {
    @responsive {
        .deck-container {
            width: 100%;
        }

        .lg-deck-container {
            width: 910px;
        }

        .card {
            width: 200px;
            height: 279px;
        }

        .lg-card {
           width: 150px;
            height: 209.25px;
            margin-right: 5px;
            margin-bottom: 5px;
        }

        .deck-card {
            width: 150px;
            max-height: 209px;
        }


    }
}
</style>