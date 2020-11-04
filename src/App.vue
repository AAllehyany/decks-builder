<template>
  <div id="app">
    <header class="p-2 flex shadow-md mb-3">
      <div class="w-full flex mx-auto justify-between items-center">
        <div>
          <h1 class="text-gray-800 text-base uppercase font-bold">deck builder</h1>
        </div>
        <div>
          <input type="search" 
            class=" w-40 p-1 bg-transparent text-gray-800 focus:outline-none hover:outline-none border-solid border-b border-b-1 border-gray-800" 
            placeholder="enter deck code..." />
        </div>
      </div>
    </header>
    <router-view />
  </div>
</template>
