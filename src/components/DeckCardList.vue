<template>
    <div class="grid grid-cols-3 sm:grid-cols-5 gap-1 w-full">
        <DeckCard 
            
            v-for="card in cards" 
            :card="card" 
            :key="card._id"  />
    </div>
</template>
<script>
import DeckCard from '../components/DeckCard';
export default {
    components: {DeckCard},
    props: {
        cards: Array,
    }
}
</script>