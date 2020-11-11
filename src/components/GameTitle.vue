<template>
    <router-link :to="{path: '/create', query: {c: game.code}}"  class="h-16 border border-gray-800 hover:bg-gray-300 cursor-pointer w-full max-w-sm items-center justify-center flex">
        <span class="text-gray-800 p-0 font-bold text-xl">
            {{game.title}}
        </span>
    </router-link>
</template>
<script>
export default {
    props: {
        game: Object
    }
}
</script>