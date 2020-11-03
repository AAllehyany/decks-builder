<template>
    <div class="flex p-2">
        <form class="w-full flex justify-between items-center flex-col" >
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
        </form>
    </div>
</template>