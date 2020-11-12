<template>
    <div class="w-full h-full fixed left-0 top-0 bg-black z-50 flex overflow-x-hidden overflow-y-auto">
        <div class="container mx-auto flex-col flex p-1">
            <div class="w-full flex justify-between sticky top-0 mb-4 z-40">
                <div class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="fill-current text-yellow-500 w-6 h-6">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
                <span class="text-yellow-500 text-xl py-3 px-1">{{deckSize}}</span>
                <span class="text-yellow-500 text-sm py-2">/50</span></div>
                <button class="w-24 bg-red-600 text-white py-3 appearance-none focus:outline-none" @click="hide">CLOSE</button>
            </div>
            <div class="w-full border-b border-gray-500 flex justify-between mb-2">
                <input type="text" v-model="deckTitle" placeholder="deck title"
                class="appearance-none bg-black text-white p-1 focus:outline-none w-full">
                <button class="w-24 bg-green-600 focus-outline appearance-none text-white text-base mb-1 p-2" @click="trySaveDeck">SAVE</button>
            </div>
            <div v-if="saveError != null" class="w-full items-center p-1 bg-black flex">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="fill-current text-red-700 w-8 h-8">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                <p class="text-red-700 p-3 text-sm">{{saveError.message}}</p>
            </div>
            <div class="flex w-full justify-center"><SearchList :cards="deck" class="w-full lg:w-3/5"/></div>
        </div>
    </div>
</template>
<script>
import {computed, ref } from 'vue';
import { useStore } from 'vuex';
import SearchList from './SearchList';
import {useRouter } from 'vue-router';

export default {
    props: {
        deck: Array,
        control: Boolean,
    },
    components: {
        SearchList
    },
    setup() {
        const store = useStore();
        const deckTitle = ref('');
        const router = useRouter();
        const deckSize = computed(() => store.state.currentDeck.length);

        const saveError = computed(() => store.state.errorMsg)

        const hide = () => {
            document.body.classList.remove('modal-open');
            store.commit('setPreviewDeck', false);
        }

        const trySaveDeck = async () => {
            try {
                await store.dispatch('save', deckTitle.value);
                router.push({name: 'ViewDeck', params: {code: store.state.deckCode}});
            } catch(e) {
                console.log(e.response);
                //saveError.message = e.message;
            }
        }

        return {hide,deckTitle, saveError,trySaveDeck,deckSize}
    }
}
</script>
<style scoped>
.card {
    width:200px;
    height: 279px;
}
</style>