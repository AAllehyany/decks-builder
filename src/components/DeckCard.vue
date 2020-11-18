<template>
    <div class="group relative">
        <img :src="card.image_url" class="w-full h-auto"  @click="previewCard"/>
        <div class="absolute flex w-full justify-end bottom-0 right-0">
            <span class="p-1 bg-black text-white text-base  rounded-full flex items-center w-6 h-6 justify-center">{{copies}}</span>
        </div>
    </div>
</template>
<script>
import {computed, toRefs} from 'vue';
import {useStore} from 'vuex';

export default {
    props: {
        card: Object,
        previewAction: Function
    },
    setup(props) {
        const store = useStore();
        const {card} = toRefs(props);
        const copies = computed(() => store.state.deckInfo.cards.filter(c => c._id === card.value._id).length)


        function previewCard() {
            document.body.classList.add('modal-open')
            store.commit('setPreviewCard', card.value);
        }

        return {
            previewCard,
            copies
        }
    }
}
</script>
<style scoped>
.card-controls {
    width: 100%;
}
</style>