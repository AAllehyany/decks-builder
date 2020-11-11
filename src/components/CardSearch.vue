<template>
    <div class="flex lg:h-16 items-center w-full bg-gray-800 lg:justify-center">
        <form @submit="onSubmit" action="POST" class="flex flex-col justify-start lg:justify-center lg:flex-row ">
            <div class="mb-4 lg:mb-0 lg:mr-4 flex items-center">
                <input 
                    placeholder="name"
                    v-model="form.name"
                    type="text" 
                    class="rounded appearance-none text-white text-sm py-1 px-3 border border-1 border-teal-400 focus:outline-none" id="name">
            </div>
            <div class="mb-4 lg:mb-0 lg:mr-4 flex items-center">
                <select v-model="form.card_type" id="card_type" class="text-sm w-20  block bg-white border border-teal-400 hover:border-teal-500 px-3 py-1 rounded focus:outline-none">
                    <option value="">choose type..</option>
                    <option value="0">Character</option>
                    <option value="1">Event</option>
                    <option value="2">Climax</option>
                </select>
            </div><div class="mb-4 lg:mb-0 lg:mr-4 flex items-center">
                <select v-model="form.color" id="card_color" class="text-sm w-20 block bg-white border border-teal-400 hover:border-teal-500 px-3 py-1 rounded focus:outline-none">
                    <option value="">choose color..</option>
                    <option value="1">Yellow</option>
                    <option value="2">Green</option>
                    <option value="3">Red</option>
                    <option value="4">Blue</option>
                </select>
            </div>
            <div class="mb-4 lg:mb-0 lg:mr-4 flex items-center">
                <label for="min_power " class="text-white text-sm font-normal mr-1">Cost</label>
                <div class="flex space-x-2 justify-end items-center">
                    <input v-model="form.min_cost" type="text" class="text-sm block w-10 bg-white border border-teal-400 hover:border-teal-500 px-1 py-1 rounded focus:outline-none"
                    placeholder="min..." id="min_cost">
                    <span class="text-white text-sm font-normal mb-2">-</span>
                    <input v-model="form.max_cost" type="text" class="text-sm block w-10 bg-white border border-teal-400 hover:border-teal-500 px-1 py-1 rounded focus:outline-none"
                    placeholder="max...">
                </div>
            </div>
            <div class="mb-4 lg:mb-0 lg:mr-4 flex items-center">
                <label for="min_power " class="text-white text-sm font-normal mr-1">Power</label>
                <div class="flex space-x-2 justify-end items-center">
                    <input v-model="form.min_power" type="text" class="text-sm block w-10 bg-white border border-teal-400 hover:border-teal-500 px-1 py-1 rounded focus:outline-none"
                    placeholder="min..." id="min_power">
                    <span class="text-white text-sm font-normal mb-2">-</span>
                    <input v-model="form.max_power" type="text" class="text-sm block w-10 bg-white border border-teal-400 hover:border-teal-500 px-1 py-1 rounded focus:outline-none"
                    placeholder="max...">
                </div>
            </div>
            <div class="mb-4 lg:mb-0 lg:mr-4 flex items-center">
                <label for="min_level " class="text-white text-sm font-normal mr-1">Level</label>
                <div class="flex space-x-2 justify-end items-center">
                    <input v-model="form.min_level" type="text" class="text-sm block w-10 bg-white border border-teal-400 hover:border-teal-500 px-1 py-1 rounded focus:outline-none"
                    placeholder="min..." id="min_level">
                    <span class="text-white text-sm font-normal mb-2">-</span>
                    <input v-model="form.max_level" type="text" class="text-sm block w-10 bg-white border border-teal-400 hover:border-teal-500 px-1 py-1 rounded focus:outline-none"
                    placeholder="max...">
                </div>
            </div>
            <div class="flex justify-start w-full">
                <button class="text-sm block w-24 bg-white bg-teal-400 hover:bg-teal-500 px-1 py-1 rounded focus:outline-none">search</button>
            </div>
        </form>
    </div>
</template>
<script>
import { toRefs } from 'vue';

export default {
    props: {
        onSearch: Function,
        searchQuery: Object

    },
    setup(props) {
        const {searchQuery} = toRefs(props);
        const onSubmit = async(e) => {
            e.preventDefault();
            await props.onSearch();
        }

        return {
            onSubmit,
            form: searchQuery
        }
    }
}
</script>