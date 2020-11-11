<template>
  <div class="flex p-10">
    <div class="flex flex-wrap justify-center container mx-auto">
      <div class="w-full text-center mb-8">
        <h1 class="font-bungee text-3xl text-yellow-700">DECK BUILDER</h1>
        <p class="font-mono text-sm text-gray-400">Build and share decks for the games you like!</p>
      </div>
      <GameTitle :game="games[0]" :key="games[0].id" class="mr-2"/>
    </div>
  </div>
</template>

<script>
import GameTitle from '../components/GameTitle';

export default {
  components: {
    GameTitle,
  },
  setup() {
    return {
      games: [{title: 'Weiss Schwarz', id: 1, code: 'WS'}]
    }
  }
}
</script>
