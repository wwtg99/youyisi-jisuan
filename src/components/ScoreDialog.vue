<template>
  <q-dialog ref="dialog" persistent @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-pa-md text-center">
      <p class="text-h5 text-center">{{ $t('finish') }}</p>
      <div v-if="showScore">
        <p class="text-caption">{{ $t('score') }}</p>
        <q-knob
          :min="0"
          :max="totalScore"
          :model-value="score"
          show-value
          readonly
          size="5rem"
          :thickness="0.3"
          color="teal"
          track-color="grey-3"
          class="q-ma-md"
        />
      </div>
      <div v-if="showScore">
        <q-rating
          :model-value="rate"
          size="3.5em"
          :max="3"
          color="yellow-5"
          icon="star_border"
          icon-selected="star"
          readonly
        />
      </div>
      <p class="q-pa-sm row q-gutter-sm justify-center">
        <span v-if="correct" class="green">{{ $t('correct') }}: {{ correct }}</span>
        <span v-if="incorrect" class="red">{{ $t('incorrect') }}: {{ incorrect }}</span>
      </p>
      <p v-if="timeSeconds && timeSeconds > 0" class="q-pa-sm row q-gutter-sm justify-center">
        {{ $t('time_consume') }}: {{ timeSeconds }} {{ $t('second') }}
      </p>
      <div class="row justify-center">
        {{ $t('reword') }}
      </div>
      <div class="row justify-center">
        <q-img :src="rewordImgSrc" class="reword animate__animated animate__rubberBand animate__infinite"></q-img>
      </div>
      <q-card-actions align="right">
        <q-btn color="primary" :label="$t('play_again')" @click="onOKClick" />
        <q-btn flat color="primary" :label="$t('return')" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import 'animate.css'

export default {
  name: 'ScoreDialog',
  props: {
    score: {
      type: Number
    },
    totalScore: {
      type: Number,
      default: 100
    },
    correct: {
      type: Number
    },
    incorrect: {
      type: Number
    },
    timeSeconds: {
      type: Number
    }
  },
  setup () {
    return {}
  },
  emits: [
    // REQUIRED
    'ok', 'hide'
  ],
  data () {
    return {
      rewordImgSrc: ''
    }
  },
  computed: {
    showScore () {
      return this.$store.state.equation.scoreEach > 0
    },
    rate () {
      const s = this.score / this.totalScore
      if (s > 0.66) {
        return 3
      } else if (s <=0.66 && s > 0.33) {
        return 2
      } else if (s > 0) {
        return 1
      } else {
        return 0
      }
    }
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.updateReword()
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick () {
      // we just need to hide the dialog
      this.$emit('cancel')
      this.hide()
    },

    updateReword () {
      this.rewordImgSrc = '/images/rewords/' + this.$store.getters['equation/getReword']()
    }
  },
  created () {
    this.updateReword()
  }
}
</script>
<style scoped>
.green {
  color: green;
}
.red {
  color: red;
}
.reword {
  max-width: 80px;
}
</style>
