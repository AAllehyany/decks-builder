<template>
    <div class="h-48 bg-gray-800 w-56 items-center justify-center flex">
        <h1 class="text-white p-0 font-bold text-lg uppercase">{{game.title}}</h1>
    </div>
</template>
<script>
export default {
    props: {
        game: Object
    }
}
</script>