<template>
    <div class="relative">
        <img :src="card.image_url" class="w-full h-auto duration-100 rounded-lg transform hover:scale-102" alt="" @click="cardClick">
        <div class="absolute bottom-0 left-0 w-full flex justify-center items-center" v-if="showMeta">
            <span class="w-10 h-10 rounded-full bg-gray-400 mr-1 cursor-pointer" @click="previewCard">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="fill-current w-10 h-10 text-gray-600">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
            </span>
            <span class="bg-black py-1 px-3 text-base text-white rounded mr-1">{{copies}} / 4</span>
            <span class="w-10 h-10 rounded-full bg-gray-400 mr-1 cursor-pointer" @click="removeCopy">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="fill-current w-10 h-10 text-gray-600">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                </svg>
            </span>
        </div>
    </div>
</template>
<script>
import { computed, ref, toRefs } from 'vue';
import { useStore } from 'vuex'
export default {
    props: {
        card: Object,
    },
    setup(props) {
        const {card} = toRefs(props);
        const store = useStore();
        const copies = computed(() => store.state.currentDeck.filter(c => c._id === card.value._id).length);
        const meta = ref(false);

        const showMeta = computed(() => meta.value || copies.value > 0);

        const cardClick = () => {
            if(meta.value) {
                store.dispatch('addCardToDeck', card.value);
            } else {
                meta.value = !meta.value;
            }
            
        }

        const previewCard = () => {
            document.body.classList.add('modal-open');
            store.commit('setPreviewCard', card.value);
        }

        const removeCopy = () => {
            store.dispatch('removeCardFromDeck', card.value);
            if(copies.value <= 0) {
                meta.value = false;
            }
        }

        return {
            copies,
            showMeta,
            cardClick,
            previewCard,
            removeCopy
        }
    }
}
</script>
<style scoped>

@layer utilities {
    @responsive {
        .card {
            width: 150px;
            max-height: 210px;
        }
    }
}

</style>