<template>
    <div class="container flex mx-auto w-3/5">
        <CardList 
            :cards="makeUnique(deck.cards)" class="w-full flex flex-wrap" 
            content-display="w-1/2 sm:w-1/3 md:w-1/5 lg:w-1/6"
            :get-copies="getCopies"
        />
        <div class="w-1/5">
        </div>
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