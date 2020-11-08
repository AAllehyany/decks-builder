<template>
    <div class="w-full bg-gray-300 overflow-y-auto deck-list rounded-md border-4 border-teal-800">
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