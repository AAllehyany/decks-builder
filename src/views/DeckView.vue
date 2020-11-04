<template>
    <p v-for="(card, i) in deck.cards" :key="i">{{card._id}} :: {{card.name}}</p>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex'
export default {
    props: {
        code: String
    },
    setup(props) {
        const store = useStore();
        const deck = computed(() => store.state.deckInfo)
        onMounted(async () => {
            await store.dispatch('loadDeckCards', props.code);
        });

        return {
            deck
        }
    }
}
</script>