<template>
    <div class="w-full h-full absolute inset-0 bg-black opacity-95 z-50 items-center flex overflow-hidden" @click="hideDetails">
        <div class="max-w-screen-md mx-auto flex justify-center">
            <img :src="card.image_url" alt="" class="card object-contain">
            <div class="div flex flex-col ml-1"> 
                <h1 class="w-full text-white">{{card.name}}</h1>
                <p class="text-white">{{card.text}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex'
export default {

    setup() {
        const store=  useStore();
        const card = computed(() => store.state.previewCard);
        const hideDetails = () => {
            store.commit('setPreviewCard', null)
        }
        return {
            card,
            hideDetails
        }
    }
}
</script>
<style scoped>
.card {
    width:200px;
    height: 279px;
}
</style>