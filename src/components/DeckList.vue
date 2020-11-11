<template>
    <div class="w-full bg-gray-100 overflow-y-auto deck-list border-4 border-gray-800">
        <div class="w-full mb-1 p-2 bg-gray-800">
            <h3 class="text-white text-gray-100 font-bold m-0">
                Deck List {{deck.length}} / 50
            </h3>
        </div>
        <div v-for="(card, i) in deckList" :key="i" class="border-b border-gray-800 p-1 w-full  mb-px flex justify-between items-center">
            <span class="text-gray-800 truncate text-base">{{card.name}}</span>
            <div class="flex justify-between items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"  class="fill-current cursor-pointer text-red-500 w-6 h-6" @click="removeCopy(card)">
                    <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
                </svg>
                <span class="text-base text-gray-800 font-bold">{{card.copies}}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="fill-current cursor-pointer text-green-800 w-6 h-6" @click="addCopy(card)">
                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                
            </div>
            
        </div>
    </div>
</template>
<script>
import { computed, toRefs } from 'vue'
import { useStore } from 'vuex';
export default {
    props: {
        deck: Array
    },
    setup(props) {
        const store = useStore();
        const {deck} = toRefs(props);

        const withCopies = computed(() => {
            const copies = deck.value.reduce((p, c) => {
                const _id = c._id;
                if(p[_id] === undefined) {
                    p[_id] = {copies: 0, ...c}
                }

                p[_id].copies++;
                return p
            }, {})

            return Object.values(copies);
        });

        const removeCopy = async (card) => {
            store.dispatch('removeCardFromDeck', card);
        }

        function addCopy(card) {
            store.dispatch('addCardToDeck', card);
        }


        return {
            deckList: withCopies,
            removeCopy,
            addCopy
        }
    }
}
</script>
<style scoped>
@layer utilities {
    @responsive {
        .deck-list {
            height: 32rem;
        }
    }
}
</style>