<template>
    <div>
        <DeckCard 
            :class="contentDisplay" 
            v-for="card in cards" 
            :card="card" 
            :key="card._id" 
            :copies="getCopies(card)" />
    </div>
</template>
<script>
import DeckCard from '../components/DeckCard';
export default {
    components: {DeckCard},
    props: {
        cards: Array,
        contentDisplay: String,
        getCopies: Function
    }
}
</script>