<template>
    <div class="flex w-full flex-wrap justify-center">
        <form @submit="onSubmit" class="flex flex-col lg:flex-row p-1 items-center">
            <div class="flex mb-4">
                <div class="mr-3">
                    <label for="name" class="block text-xs text-gray-900 px-1">Card Name:</label>
                    <input type="text" placeholder="card name" id="name" v-model="form.name"
                    class="appearance-none border border-gray-600 text-sm text-gray-600 p-2 focus:outline-none w-48">
                </div>
                <div class="mr-3">
                    <label for="min_power" class="block text-xs text-gray-900 px-1">Card Power:</label>
                    <div class="flex items-center">
                        <input type="text" id="min_power" v-model="form.min_power" placeholder="min..."
                        class="appearance-none border border-gray-600 text-sm text-gray-600 p-2 focus:outline-none w-12">
                        <span class="text-gray-600 text-sm font-normal">~</span>
                        <input type="text" id="max_power" v-model="form.max_power" placeholder="max..."
                        class="appearance-none border border-gray-600 text-sm text-gray-600 p-2 focus:outline-none w-12">
                    </div>
                </div>
            </div>

            <div class="flex mb-4">
            <div class="mr-3">
                <label for="card_type" class="block text-xs text-gray-900 px-1">Card Type:</label>
                <select v-model="form.card_type" id="card_type" class="text-sm w-48  block bg-white border border-gray-600 p-2 focus:outline-none">
                    <option value="">choose type..</option>
                    <option value="0">Character</option>
                    <option value="1">Event</option>
                    <option value="2">Climax</option>
                </select>
            </div>
            <div class="mr-3">
                <label for="min_power" class="block text-xs text-gray-900 px-1">Card Cost:</label>
                <div class="flex items-center">
                    <input type="text" id="min_cost" v-model="form.min_cost" placeholder="min..."
                    class="appearance-none border border-gray-600 text-sm text-gray-600 p-2 focus:outline-none w-12">
                    <span class="text-gray-600 text-sm font-normal">~</span>
                    <input type="text" id="max_cost" v-model="form.max_cost" placeholder="max..."
                    class="appearance-none border border-gray-600 text-sm text-gray-600 p-2 focus:outline-none w-12">
                </div>
            </div>
            
            </div>
            <div class="flex mb-4">
                <div class="mr-3">
                    <label for="color" class="block text-xs text-gray-900 px-1">Card Color:</label>
                    <select v-model="form.color" id="color" class="text-sm w-48  block bg-white border border-gray-600 p-2 focus:outline-none">
                        <option value="">choose color..</option>
                        <option value="1">Yellow</option>
                        <option value="2">Green</option>
                        <option value="3">Red</option>
                        <option value="4">Blue</option>
                    </select>
                </div>
                
                <div class="mr-3">
                    <label for="min_level" class="block text-xs text-gray-900 px-1">Card level:</label>
                    <div class="flex items-center">
                        <input type="text" id="min_level" v-model="form.min_level" placeholder="min..."
                        class="appearance-none border border-gray-600 text-sm text-gray-600 p-2 focus:outline-none w-12">
                        <span class="text-gray-600 text-sm font-normal">~</span>
                        <input type="text" id="max_level" v-model="form.max_level" placeholder="max..."
                        class="appearance-none border border-gray-600 text-sm text-gray-600 p-2 focus:outline-none w-12">
                    </div>
                </div>
            </div>
            <!-- <div class="flex mb-4">
                <div class="mr-3">
                    <label for="title_code" class="block text-xs text-gray-900 px-1">Anime/Title:</label>
                    <select v-model="form.title_code" id="color" class="text-sm w-48  block bg-white border border-gray-600 p-2 focus:outline-none">
                        <option value="">choose color..</option>
                        <option v-for="(title, i) in titles" :key="i" :value="title.codes">{{title.title}}</option>
                    </select>
                </div>
            </div> -->
            
            <button class="appearance-none py-3 w-full lg:py-2 lg:w-20 bg-blue-500 text-lg text-white mr-3">search</button>

        </form>
    </div>
</template>
<script>
import { onBeforeMount, toRefs, ref } from 'vue';
import axios from 'axios';

export default {
    props: {
        onSearch: Function,
        searchQuery: Object

    },
    setup(props) {
        const {searchQuery} = toRefs(props);
        // const titles = ref([]);
        
        // onBeforeMount(async () => {
        //     try {
        //         const {data} = await axios.get('http://localhost:3000/titles');
        //         titles.value = data.map((e) => ({title: e.name, codes: e.title_codes.join(',')}));
        //     }catch(e) {
        //         console.log("TITLE ERROR", e);
        //     }

        // });

        const onSubmit = async(e) => {
            e.preventDefault();
            await props.onSearch();
        }

        return {
            onSubmit,
            form: searchQuery,
            //titles
        }
    }
}
</script>