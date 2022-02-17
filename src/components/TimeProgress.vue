<template>
  <div style="width: 100%">
    <q-linear-progress :value="progress" :color="color" stripe rounded size="20px" />
  </div>
</template>

<script>
export default {
  name: 'TimeProgress',
  props: {
    startOnMount: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    return {}
  },
  data () {
    return {
      progress: 0,
      tid: null
    }
  },
  computed: {
    limitMinutes () {
      return this.$store.state.equation.limitMinutes
    },
    step () {
      return 1 / (this.limitMinutes * 600)
    },
    color () {
      if (this.progress < 0.3) {
        return 'green'
      } else if (this.progress >= 0.3 && this.progress < 0.6) {
        return 'teal'
      } else if (this.progress >= 0.6 && this.progress < 0.9) {
        return 'orange'
      } else if (this.progress >= 0.9) {
        return 'red'
      } else {
        return 'green'
      }
    }
  },
  methods: {
    start () {
      this.tid = setInterval(() => {
        this.progress += this.step
        if (this.progress >= 1.0) {
          this.timesUp()
        }
      }, 100)
    },
    stop () {
      if (this.tid) {
        clearInterval(this.tid)
      }
    },
    restart () {
      this.stop()
      this.progress = 0
      this.start()
    },
    getTime () {
      return Math.round(this.progress * 60 * this.limitMinutes)
    },
    timesUp () {
      clearInterval(this.tid)
      this.$emit("timesUp")
    }
  },
  mounted () {
    if (this.startOnMount) {
      this.start()
    }
  },
  unmounted () {
    if (this.tid) {
      clearInterval(this.tid)
    }
  }
}
</script>
