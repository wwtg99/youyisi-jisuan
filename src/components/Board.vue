<template>
  <div>
    <div class="row q-my-sm">
      <div v-if="currentIndex >= 0 && currentIndex < equations.length" class="col">
        <simple-equation :leftn="cureq.leftn" :rightn="cureq.rightn" :operator="cureq.operator" :answer="cureq.answer" :showAnswer="showAnswer"></simple-equation>
      </div>
    </div>
    <div class="row q-my-sm">
      <div class="col text-center text-weight-thin">
        ({{ currentIndex + 1 }}/{{ equations.length }})
      </div>
    </div>
    <div class="row q-py-sm">
      <div class="col">
        <q-input outlined v-model.number="answer" placeholder="答案是？" autofocus ref="input" @keyup.enter="submitAnswer">
          <template v-slot:append>
            <q-btn round flat icon="send" @click="submitAnswer" />
          </template>
        </q-input>
      </div>
    </div>
    <q-slide-transition>
      <div v-show="showNumber">
        <div class="row q-my-sm text-center">
          <div class="col-4">
            <q-btn outline color="primary" label="1" @click="inputAnswer('1')" />
          </div>
          <div class="col-4">
            <q-btn outline color="primary" label="2" @click="inputAnswer('2')" />
          </div>
          <div class="col-4">
            <q-btn outline color="primary" label="3" @click="inputAnswer('3')" />
          </div>
        </div>
        <div class="row q-my-sm text-center">
          <div class="col-4">
            <q-btn outline color="primary" label="4" @click="inputAnswer('4')" />
          </div>
          <div class="col-4">
            <q-btn outline color="primary" label="5" @click="inputAnswer('5')" />
          </div>
          <div class="col-4">
            <q-btn outline color="primary" label="6" @click="inputAnswer('6')" />
          </div>
        </div>
        <div class="row q-my-sm text-center">
          <div class="col-4">
            <q-btn outline color="primary" label="7" @click="inputAnswer('7')" />
          </div>
          <div class="col-4">
            <q-btn outline color="primary" label="8" @click="inputAnswer('8')" />
          </div>
          <div class="col-4">
            <q-btn outline color="primary" label="9" @click="inputAnswer('9')" />
          </div>
        </div>
        <div class="row q-my-sm text-center">
          <div class="col-4">
            <q-btn outline color="primary" label="0" @click="inputAnswer('0')" />
          </div>
          <div class="col-4">
            <q-btn outline color="primary" icon="backspace" padding="sm" @click="delAnswer" />
          </div>
          <div class="col-4">
            <q-btn outline color="primary" icon="clear" padding="sm" @click="clearAnswer" />
          </div>
        </div>
      </div>
    </q-slide-transition>
    <div class="row text-center">
      <div class="col">
        <q-btn v-if="showNumber" flat icon="fas fa-angle-up" style="width: 100%;" @click="toggleNumber"></q-btn>
        <q-btn v-else flat icon="fas fa-angle-down" style="width: 100%;" @click="toggleNumber"></q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { createNamespacedHelpers } from 'vuex'
import SimpleEquation from 'components/SimpleEquation'

const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers('config')

export default {
  name: 'Board',
  components: { SimpleEquation },
  setup () {
    const $q = useQuasar()
    return {
      displayCorrect () {
        $q.notify({
          type: 'positive',
          timeout: 100,
          message: 'Correct'
        })
      },
      displayWrong () {
        $q.notify({
          type: 'negative',
          timeout: 100,
          message: 'wrong'
        })
      },
      displayScore () {
        $q.dialog({
          title: '完成',
          message: '得分：' + this.score + ', 正确：' + this.corrects.length + ', 错误：' + this.incorrects.length,
          ok: '再来一局',
          cancel: '返回'
        }).onOk(() => {
          this.$store.commit('equation/generate')
          this.reinit()
        }).onCancel(() => {
          console.log('Cancel')
          // TODO
        })
      },
    }
  },
  data () {
    return {
      currentIndex: 0,
      corrects: [],
      incorrects: [],
      score: 0,
      answer: '',
      showAnswer: false,
      showNumber: true
    }
  },
  computed: {
    equations () {
      return this.$store.state.equation.equations
    },
    cureq () {
      return this.equations[this.currentIndex]
    },
    scoreEach () {
      return this.$store.state.equation.scoreEach
    },
    ...mapGetters([
      'keyboardFold',
    ])
  },
  watch: {
    showNumber (val) {
      this.setKeyboardFold(!val)
      this.save()
    }
  },
  methods: {
    reinit () {
      this.answer = ''
      this.currentIndex = 0
      this.corrects.length = 0
      this.incorrects.length = 0
      this.score = 0
      this.showAnswer = false
    },
    inputAnswer (n) {
      this.answer += n
    },
    delAnswer () {
      if (this.answer.length > 0) {
        this.answer = this.answer.substr(0, this.answer.length - 1)
      }
    },
    clearAnswer () {
      this.answer = ''
    },
    submitAnswer () {
      let ans = this.equations[this.currentIndex].answer
      this.showAnswer = true
      if (ans == this.answer) {
        this.corrects.push(this.currentIndex)
        this.score += this.scoreEach
        this.displayCorrect()
      } else {
        this.incorrects.push(this.currentIndex)
        this.displayWrong()
      }
      this.moveToNext()
    },
    moveToNext () {
      if (this.currentIndex >= this.equations.length - 1) {
        this.displayScore()
      } else {
        this.$refs['input'].focus()
        setTimeout(() => {
          this.showAnswer = false
          this.currentIndex += 1
          this.answer = ''
        }, 800)
      }
    },
    toggleNumber () {
      this.showNumber = !this.showNumber
    },
    ...mapMutations([
      'setKeyboardFold'
    ]),
    ...mapActions([
      'save'
    ])
  },
  mounted () {
    this.showNumber = !this.keyboardFold
  }
}
</script>
