<template>
    <div class="h-48 bg-gray-800 w-56 items-center justify-center flex">
        <router-link :to="{path: '/create', query: {c: game.code}}" class="text-white p-0 font-bold text-lg uppercase">{{game.title}}</router-link>
    </div>
</template>
<script>
export default {
    props: {
        game: Object
    }
}
</script>