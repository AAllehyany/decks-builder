<template>
    <div>
        <Card 
            :class="contentDisplay" 
            v-for="card in cards" 
            :card="card" 
            :key="card._id" 
            :controls="cardControls"
            :copies="getCopies(card)" />
    </div>
</template>
<script>
import Card from '../components/Card';
export default {
    components: {Card},
    props: {
        cards: Array,
        cardControls: Boolean,
        contentDisplay: String,
        getCopies: Function
    },
}
</script>