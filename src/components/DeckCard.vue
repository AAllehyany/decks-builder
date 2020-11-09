<template>
    <div class="group relative">
        <img :src="card.image_url" class="w-full h-auto rounded-lg"  @click="previewCard"/>
        <div class="absolute flex w-full justify-center bottom-0 right-0">
            <span class="py-2 px-5 bg-black text-white text-sm font-bold cursor-pointer rounded-md">{{copies}}</span>
        </div>
    </div>
</template>
<script>
import {toRefs} from 'vue';
import {useStore} from 'vuex';

export default {
    props: {
        card: Object,
        copies: Number,
        previewAction: Function
    },
    setup(props) {
        const store = useStore();
        const {card} = toRefs(props);


        function previewCard() {
            store.commit('setPreviewCard', card.value);
        }

        return {
            previewCard,
        }
    }
}
</script>
<style scoped>
.card-controls {
    width: 100%;
}
</style>