<template>
  <q-page padding class="flex flex-center">
    <board></board>
  </q-page>
</template>

<script>
import Board from 'components/Board.vue';

export default {
  name: 'Playground',
  components: { Board }
}
</script>
