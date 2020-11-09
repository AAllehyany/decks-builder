<template>
<div id="app">
    <header class="p-2 flex shadow-md mb-3">
    <div class="w-full flex mx-auto justify-between items-center">
        <div>
        <h1 class="text-gray-800 text-base uppercase font-bold">deck builder</h1>
        </div>
        <div>
        <input type="search" 
            class=" w-40 p-1 bg-transparent text-gray-800 focus:outline-none hover:outline-none border-solid border-b border-b-1 border-gray-800" 
            placeholder="enter deck code..." />
        </div>
    </div>
    </header>
    <router-view />
    <div class="fixed top-0 left-0 bg-gray-300 opacity-25 w-full h-full" v-if="isLoading"></div>
</div>
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex'
export default {
    setup() {
        const store = useStore();

        const isLoading = computed( () => store.state.loading);


        return {
            isLoading
        }


    }
}
</script>