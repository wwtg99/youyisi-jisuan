<template>
  <span class="text-weight-bold">
    <span class="text-h2 q-mx-sm">{{ leftn }}</span
    ><span class="text-h2 q-mx-sm">{{ operator }}</span>
    <span class="text-h2 q-mx-sm">{{ rightn }}</span>
    <span class="text-h2 q-mx-sm">=</span>
    <span v-if="showAnswer" class="text-h2 q-mx-sm">{{ answer }}</span>
    <span v-else class="text-h2 q-mx-sm">?</span>
  </span>
</template>

<script>
export default {
  name: 'SimpleEquation',
  props: {
    leftn: {
      type: Number,
      required: true
    },
    operator: {
      type: String,
      default: '+'
    },
    rightn: {
      type: Number,
      required: true
    },
    answer: {
      type: Number,
      required: true
    },
    showAnswer: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>
