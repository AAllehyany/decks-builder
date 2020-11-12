<template>
    <div class="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-6 p-1 items-center">
        <SearchListCard v-for="card in cards" :key="card._id" :card="card"/>
    </div>
</template>
<script>
import SearchListCard from './SearchListCard';
export default {
    components: {
        SearchListCard
    },
    props: {
        cards: Array,
        cardClickAction: Function,
        cardAddAction: Function,
        cardRemoveAction: Function,
        cardInfoAction: Function
    }
}
</script>