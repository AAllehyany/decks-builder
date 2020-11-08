<template>
    <div class="w-full bg-gray-200 overflow-y-auto deck-list rounded-md border-4 border-teal-800">
        <div class="w-full mb-1 p-2 bg-teal-800">
            <h3 class="text-white text-base font-bold m-0">
                Deck List {{deck.length}} / 50
            </h3>
        </div>
        <p v-for="(card, i) in deck" :key="i" class="truncate bg-teal-800 p-1 w-full text-white text-base mb-px">{{card.name}}</p>
    </div>
</template>
<script>
export default {
    props: {
        deck: Array
    }
}
</script>
<style scoped>
@layer utilities {
    @responsive {
        .deck-list {
            height: 32rem;
        }
    }
}
</style>