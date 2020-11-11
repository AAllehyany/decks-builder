<template>
    <div class="container flex mx-auto w-full flex-col justify-start">
        <div class="w-full flex flex-col mb-2 justify-center">
            <h3 class="text-lg font-bold p-3">{{deck.name}}</h3>
            <p class="text-base font-bold px-5">Code: {{deck.code}}</p>
        </div>
        <CardDetails v-if="previewCard !== null" />
        <DeckCardList 
            :cards="makeUnique(deck.cards)" class="flex flex-wrap justify-start items-center w-full" 
            content-display="deck-card rounded-lg m-3"
            :get-copies="getCopies"
        />
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
                const name = c.name;
                if(p[name] === undefined) {
                    p[name] = c;
                }
                return p
            }, {});
            return Object.values(uni);
        }

        console.log(deck.value);

        return {
            deck,
            getCopies,
            makeUnique,
            previewCard
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