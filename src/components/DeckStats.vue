<template>
<div class="flex flex-col w-full lg:w-2/5 p-2 md:flex-row lg:flex-col">
        <div class="flex items-center flex-col px-3 py-1 relative bg-gray-300 border-l-2 border-gray-600 w-full max-w-xs mb-3 mr-2">
            <span class="text-base text-gray-600 mb-2">Level Stats:</span>
            <div class="flex justify-between w-full p-1">
                <span class="flex items-center justify-center w-1/5 py-2 border border-gray-600 text-gray-600">{{filterByLevel(0)}}</span>
                <span class="flex items-center justify-center w-1/5 py-2 border border-gray-600 text-gray-600">{{filterByLevel(1)}}</span>
                <span class="flex items-center justify-center w-1/5 py-2 border border-gray-600 text-gray-600">{{filterByLevel(2)}}</span>
                <span class="flex items-center justify-center w-1/5 py-2 border border-gray-600 text-gray-600">{{filterByLevel(3)}}</span>
            </div>
            <div class="flex justify-between w-full p-1">
                <span class="flex items-center justify-center w-1/5 py-2 bg-gray-600 text-gray-300">0</span>
                <span class="flex items-center justify-center w-1/5 py-2 bg-gray-600 text-gray-300">1</span>
                <span class="flex items-center justify-center w-1/5 py-2 bg-gray-600 text-gray-300">2</span>
                <span class="flex items-center justify-center w-1/5 py-2 bg-gray-600 text-gray-300">3</span>
            </div>
        </div>
        <div class="flex items-center flex-col px-3 py-1 relative bg-gray-300 border-l-2 border-gray-600 w-full max-w-xs mb-3 mr-2">
            <span class="text-base text-gray-600 mb-2">Color Stats:</span>
            <div class="flex justify-between w-full p-1">
                <span class="flex items-center justify-center w-1/5 py-2 border border-gray-600 text-gray-600">{{filterByColor(1)}}</span>
                <span class="flex items-center justify-center w-1/5 py-2 border border-gray-600 text-gray-600">{{filterByColor(2)}}</span>
                <span class="flex items-center justify-center w-1/5 py-2 border border-gray-600 text-gray-600">{{filterByColor(3)}}</span>
                <span class="flex items-center justify-center w-1/5 py-2 border border-gray-600 text-gray-600">{{filterByColor(4)}}</span>
            </div>
            <div class="flex justify-between w-full p-1">
                <span class="flex items-center justify-center w-1/5 py-2 bg-yellow-600 text-gray-300">0</span>
                <span class="flex items-center justify-center w-1/5 py-2 bg-green-600 text-gray-300">1</span>
                <span class="flex items-center justify-center w-1/5 py-2 bg-red-600 text-gray-300">2</span>
                <span class="flex items-center justify-center w-1/5 py-2 bg-blue-600 text-gray-300">3</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        deck: Array
    },
    setup(props) {
        const filterByLevel = (level) => {
            if(!props.deck) return 0;
            return props.deck.filter(c => c.level === level).length;
        }

        const filterByColor = (color) => {
            if(!props.deck) return 0;
            return props.deck.filter(c => c.color === color).length;
        }

        return {
            filterByLevel,
            filterByColor
        }
    }
}
</script>