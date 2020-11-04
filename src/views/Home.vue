<template>
  <div class="flex p-10">
    <div class="flex justify-center container mx-auto">
    <GameTitle v-for="game in games" :game="game" :key="game.id" class="mr-2"/>
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
      games: [{title: 'Weiss Scharz', id: 1, code: 'WS'}, {title: 'Yu-Gi-Oh!', id: 2, code: 'YGO'}, {title: 'Digimon TCG', id: 3, code: 'DIG'}]
    }
  }
}
</script>
