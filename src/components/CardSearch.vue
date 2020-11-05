<template>
    <div class="flex flex-col px-1">

        <div class="w-full border-l-8 border-r-8 border-teal-800 p-2 rounded">
            <h3 class="text-lg text-teal-800 font-bold uppercase">card search</h3>
        </div>
        <form action="POST" class="w-full flex items-center p-2 flex-col ">
            <div class="mb-4 w-full flex items-center">
                <label for="name" class="text-gray-800 text-sm font-normal w-1/4">Name</label>
                <input 
                    type="text" 
                    class="rounded w-full appearance-none text-gray-800 text-sm py-1 px-3 border border-1 border-teal-400 focus:outline-none" id="name">
            </div>
            <div class="mb-4 w-full flex items-center">
                <label for="card_type" class="text-gray-800 text-sm font-normal w-1/4">Type</label>
                <select id="card_type" class="text-sm block w-full bg-white border border-teal-400 hover:border-teal-500 px-3 py-1 rounded focus:outline-none">
                    <option value="">choose type..</option>
                    <option value="0">Character</option>
                    <option value="1">Event</option>
                    <option value="2">Climax</option>
                </select>
            </div>
            <div class="mb-4 w-full flex items-center">
                <label for="min_cost " class="text-gray-800 text-sm font-normal w-1/4">Cost</label>
                <div class="flex space-x-2 w-full justify-end items-center">
                    <input type="text" class="text-sm block w-1/3 bg-white border border-teal-400 hover:border-teal-500 px-1 py-1 rounded focus:outline-none"
                    placeholder="min..." id="min_cost">
                    <span class="text-gray-800 text-sm font-normal mb-2">-</span>
                    <input type="text" class="text-sm block w-1/3 bg-white border border-teal-400 hover:border-teal-500 px-1 py-1 rounded focus:outline-none"
                    placeholder="max...">
                </div>
            </div>
            <div class="mb-4 w-full flex items-center">
                <label for="min_power " class="text-gray-800 text-sm font-normal w-1/4">Power</label>
                <div class="flex space-x-2 w-full justify-end items-center">
                    <input type="text" class="text-sm block w-1/3 bg-white border border-teal-400 hover:border-teal-500 px-1 py-1 rounded focus:outline-none"
                    placeholder="min..." id="min_power">
                    <span class="text-gray-800 text-sm font-normal mb-2">-</span>
                    <input type="text" class="text-sm block w-1/3 bg-white border border-teal-400 hover:border-teal-500 px-1 py-1 rounded focus:outline-none"
                    placeholder="max...">
                </div>
            </div>
            <div class="mb-4 w-full flex items-center">
                <label for="min_level " class="text-gray-800 text-sm font-normal w-1/4">Level</label>
                <div class="flex space-x-2 w-full justify-end items-center">
                    <input type="text" class="text-sm block w-1/3 bg-white border border-teal-400 hover:border-teal-500 px-1 py-1 rounded focus:outline-none"
                    placeholder="min..." id="min_level">
                    <span class="text-gray-800 text-sm font-normal mb-2">-</span>
                    <input type="text" class="text-sm block w-1/3 bg-white border border-teal-400 hover:border-teal-500 px-1 py-1 rounded focus:outline-none"
                    placeholder="max...">
                </div>
            </div>
            <div class="flex justify-end w-full">
                <button class="text-sm block w-1/3 bg-white bg-teal-400 hover:bg-teal-500 px-1 py-1 rounded focus:outline-none">search</button>
            </div>
        </form>

        <!-- <form class="w-full flex justify-between items-center flex-col" >
            <div class="flex flex-wrap w-full flex-col flex-row justify-center md:justify-start">
                <div class="mb-1">
                    <label for="searchName" class="text-base p-1 text-gray-800">Name: </label>
                    <input type="text" 
                    class="text-base m-px p-1 text-gray-800 focus:outline-none w-48 border border-gray-500 hover:border-gray-900 focus:border-blue-500 mr-5"
                    placeholder="card name..." v-model="name" id="searchName">
                </div>
                <div class="mb-1">
                    <label for="minPower" class="text-base p-1 text-gray-800">Min. Power: </label>
                    <input type="text" 
                        class="text-base m-px p-1 text-gray-800 focus:outline-none w-16 border border-gray-500 hover:border-gray-900 focus:border-blue-500 mr-px"
                        placeholder=">=" v-model="min_power" id="minPower">
                    <label for="maxPower" class=" text-base p-1 text-gray-800">Max. Power: </label>
                    <input type="text" 
                        class="text-base m-px p-1 text-gray-800 focus:outline-none w-16 border border-gray-500 hover:border-gray-900 focus:border-blue-500 mr-5"
                        placeholder="<=" v-model="max_power" id="maxPower">
                </div>
                <div class="mb-1 space-x-2 flex w-full justify-between">
                    <p class="p-1 text-base">Level: </p>
                    <div class="text-base border border-1 border-gray-700 border-solid py-1 px-4 hover:bg-gray-700">0</div>
                    <div class="text-base border border-1 border-gray-700 border-solid py-1 px-4 hover:bg-gray-700">1</div>
                    <div class="text-base border border-1 border-gray-700 border-solid py-1 px-4 hover:bg-gray-700">2</div>
                    <div class="text-base border border-1 border-gray-700 border-solid py-1 px-4 hover:bg-gray-700">3</div>
                </div>
                <div class="mb-1 space-x-2 flex w-full justify-between">
                    <div class="text-base border border-1 border-yellow-500 border-solid py-1 px-4 hover:bg-yellow-500 text-yellow-500 hover:text-white focus:text-white">Yellow</div>
                    <div class="text-base border border-1 border-gray-700 border-solid py-1 px-4 hover:bg-gray-700">Green</div>
                    <div class="text-base border border-1 border-gray-700 border-solid py-1 px-4 hover:bg-gray-700">Red</div>
                    <div class="text-base border border-1 border-gray-700 border-solid py-1 px-4 hover:bg-gray-700">Blue</div>
                </div>
                <div class="mb-1 space-x-2 flex w-full justify-between">
                    <div class="text-base border border-1 border-gray-700 border-solid py-1 px-4 hover:bg-gray-700">Character</div>
                    <div class="text-base border border-1 border-gray-700 border-solid py-1 px-4 hover:bg-gray-700">Event</div>
                    <div class="text-base border border-1 border-gray-700 border-solid py-1 px-4 hover:bg-gray-700">Climax</div>
                </div>
            </div>
            <button type="submit" class="w-full  text-base font-bold uppercase px-4 py-2 bg-gray-500 text-white hover:bg-gray-600 focus:bg-green-500 focus:outline-none">Filter</button>
        </form> -->
    </div>
</template>