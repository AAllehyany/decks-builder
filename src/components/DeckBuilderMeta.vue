<template>
    <div class="flex items-center w-full bg-gray-900 justify-between">
        <div class="flex items-center px-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="fill-current text-yellow-500 w-6 h-6">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            <span class="text-yellow-500 text-xl py-3 px-1">{{deck.length}}</span>
            <span class="text-yellow-500 text-sm py-2">/50</span>
        </div>
        <button class="group appearance-none hover:text-green-500 text-base text-green-300 px-3 flex items-center" @click="startDeckPreview">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="fill-current text-green-300 w-6 h-6 group-hover:text-green-500 mr-1">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
            </svg>
            Preview
        </button>
    </div>
</template>
<script>
import { useStore } from 'vuex'
export default {
    props: {
        deck: Array,
    },
    setup() {
        const store = useStore();

        const startDeckPreview = () => {
            document.body.classList.add('modal-open');
            store.commit('setPreviewDeck', true);
        }

        return {
            startDeckPreview
        }
    }
}
</script>