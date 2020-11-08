<template>
    <div class="container flex mx-auto w-full justify-start">
        <CardList 
            :cards="makeUnique(deck.cards)" class="deck-container flex flex-wrap justify-start lg:lg-deck-container lg:bg-gray-200" 
            content-display="sm-card lg:lg-card"
            :get-copies="getCopies"
        />
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex'
import CardList from '../components/CardList';

export default {
    props: {
        code: String
    },
    components: {CardList},
    setup(props) {
        const store = useStore();
        const deck = computed(() => store.state.deckInfo);
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

        return {
            deck,
            getCopies,
            makeUnique
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


    }
}
</style>