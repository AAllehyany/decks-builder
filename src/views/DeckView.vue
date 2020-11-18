<template>
<div class="container mx-auto">
    <CardDetails v-if="previewCard !== null" />
    <div class="flex p-1 flex-wrap justify-start items-start">
        <h1 class="w-full text-lg text-gray-800 p-2 capitalize mb-4">{{deck.name}}</h1>
        <div class="w-full flex items-center px-3 py-1 justify-start border-l-2 border-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="fill-current text-blue-500 w-6 h-6 mr-2">
                <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            <span class="text-gray-600 text-base">{{deck.code}}</span>
        </div>
        <DeckCardList 
            :cards="makeUnique(sorted)" class="items-center p-1 w-full lg:w-3/5 mb-3" 
            :get-copies="getCopies"
        />
        <DeckStats :deck="deck.cards" />
    </div>
</div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex'
import DeckCardList from '../components/DeckCardList';
import CardDetails from '../components/CardDetails';
import DeckStats from '../components/DeckStats';
export default {
    props: {
        code: String
    },
    components: {DeckCardList, CardDetails, DeckStats},
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
            if(!store.state.deckInfo.cards) return [];
            const cards = store.state.deckInfo.cards;
            return [...cards].sort((a,b) => (a.level - b.level) || (a.card_type - b.card_type));
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