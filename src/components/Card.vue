<template>
    <div class="group relative">
        <img :src="card.image_url" class="transition duration-100 w-full h-full rounded-lg transform hover:scale-102"  @click="toggleControls"/>
        <!-- Card controls -->
        <div v-if="(state && controls) || copies > 0" class="absolute flex justify-center w-full bottom-0 left-0 py-1 px-3 items-center">
            <div class="flex justify-between mr-2">
                <span class="bg-white p-0 mr-1 h-8 w-8 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"  class="h-8 w-8 fill-current text-green-600 cursor-pointer" @click="addCopy">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                    </svg>
                </span>
                <span class="bg-white p-0 m-0 h-8 w-8 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="h-8 w-8 fill-current text-red-600 cursor-pointer" @click="removeCopy">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                    </svg>
                </span>
            </div>
            <span class="py-2 px-3 bg-black text-white text-base cursor-pointer rounded-md" @click="addCopy">{{copies}} / 4</span>
        </div>
        <span v-if="(state && controls) || copies > 0" class="bg-white p-0 m-0 h-8 w-8 rounded-full absolute top-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="h-8 w-8 fill-current text-yellow-600 cursor-pointer" @click="previewCard">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
        </span>
        <div v-if="!controls" class="absolute flex bottom-0 right-0">
            <span class="py-2 px-3 bg-black text-white text-lg font-bold cursor-pointer rounded-full">{{copies}}</span>
        </div>
    </div>
</template>
<script>
import {toRefs, ref} from 'vue';
import {useStore} from 'vuex';

export default {
    props: {
        card: Object,
        controls: Boolean,
        copies: Number,
        previewAction: Function
    },
    setup(props) {
        const store = useStore();
        const {card, copies} = toRefs(props);

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

        function previewCard() {
            document.body.classList.add('modal-open')
            store.commit('setPreviewCard', card.value);
        }

        return {
            state,
            toggleControls,
            removeCopy,
            addCopy,
            previewCard
        }
    }
}
</script>
<style scoped>
.card-controls {
    width: 100%;
}
</style>