<template>
    <div class="grid grid-cols-5 md:grid-cols-10 gap-1 w-full">
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