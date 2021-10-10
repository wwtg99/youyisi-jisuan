<template>
  <q-page padding class="flex flex-center">
    <board></board>
  </q-page>
</template>

<script>
import Board from 'components/Board.vue';

export default {
  name: 'Playground',
  components: { Board },
  mounted () {
    this.$store.commit('equation/setNumber', 10)
    this.$store.commit('equation/setType', 1)
    this.$store.commit('equation/generate')
  }
}
</script>
