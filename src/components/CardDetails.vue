<template>
    <div class="w-full h-full fixed left-0 bottom-0 bg-black opacity-95 z-50 items-center flex overflow-hidden">
        <div class="max-w-screen-md mx-auto flex flex-col lg:flex-row justify-center">
            <img :src="card.image_url" alt="" class="card object-contain"  @click="hideDetails">
            <div class="flex flex-col ml-1 p-3"> 
                <h1 class="w-full text-white font-bold">{{card.name}}</h1>
                <div class="flex mb-3">
                    <span class="text-sm text-white mr-3"><b>Traits: </b> {{card.traits}}</span>
                    <span class="text-sm text-white mr-3"><b>Level: </b> {{card.level}}</span>
                </div>
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