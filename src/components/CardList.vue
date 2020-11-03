<template>
    <div>
        <Card class="w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3" v-for="card in cards" :card="card" :key="card._id" :controls="cardControls" />
    </div>
</template>
<script>
import Card from '../components/Card';
export default {
    components: {Card},
    props: {
        cards: Array,
        cardControls: Boolean
    },
}
</script>