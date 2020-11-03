<template>
    <div class="group p-2 relative">
        <img :src="imageUrl" class="transition duration-100 w-full object-fit rounded-lg transform group-hover:scale-105 hover:scale-105"  @click="toggleControls"/>
        <div v-if="state && controls" class="absolute flex justify-between w-full bottom-0 left-0 py-1 px-3 items-center">
            <div class="flex justify-between">
                <span class="bg-white p-0 mr-1 h-10 w-10 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"  class="w-10 h-10 fill-current text-green-600 cursor-pointer" @click="addCopy">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                    </svg>
                </span>
                <span class="bg-white p-0 m-0 h-10 w-10 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="w-10 h-10 fill-current text-orange-600 cursor-pointer" @click="removeCopy">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                    </svg>
                </span>
            </div>

            <span class="py-2 px-3 bg-black text-white text-lg font-bold cursor-pointer rounded-md" @click="addCopy">{{copies}} / 4</span>
        </div>
    </div>
</template>
<script>
import {computed, toRefs, ref} from 'vue';
import {useStore} from 'vuex';

export default {
    props: {
        card: Object,
        controls: Boolean
    },
    setup(props) {
        const store = useStore();
        const {card} = toRefs(props);
        const copies = computed(() => store.state.currentDeck.filter(c => c._id === card.value._id).length);
        const img = computed(() => `/card_images/${card.value.set_code.replace('/', '_').replace('-', '_')}.jpg`);
        const state = ref(false);

        function toggleControls() {
            if(copies.value > 0) return;
            state.value = !state.value;
            
        }

        function removeCopy() {
            store.dispatch('removeCardFromDeck', card.value);
            if(copies.value <= 0) {
                state.value = false;
            }
        }

        function addCopy() {
            store.dispatch('addCardToDeck', card.value);
        }

        return {
            imageUrl: img,
            state,
            toggleControls,
            copies,
            removeCopy,
            addCopy
        }
    }
}
</script>
<style scoped>
.card-controls {
    width: 90%;
}
</style>