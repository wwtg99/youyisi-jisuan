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
    if (!this.$store.state.equation.equations || this.$store.state.equation.equations.length == 0) {
      this.$router.push({ name: 'index' })
    }
  }
}
</script>
