<template>
  <div class="flex p-10">
    <div class="flex justify-center container mx-auto">
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
      games: [{title: 'Weiss Scharz', id: 1, code: 'WS'}]
    }
  }
}
</script>
