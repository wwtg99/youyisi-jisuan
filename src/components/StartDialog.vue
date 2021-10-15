<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-pa-md">
      <p class="text-h5 text-center">{{ $t(title) }}</p>
      <q-select v-model="equationType" :options="typeOptions" emit-value map-options :label="$t('equation_type')" />
      <q-input v-model.number="equationNumber" type="number" :label="$t('equation_number')" :rules="[ val => val > 0 && val <= 100 || $t('number_1to100') ]" />
      <q-input v-if="recordTime" v-model.number="limitMinutes" type="number" :label="$t('limit_minutes')" :rules="[ val => val > 0 && val <= 60 || $t('number_1to60') ]" />
      <q-card-actions align="right">
        <q-btn color="primary" :label="$t('start')" @click="onOKClick" />
        <q-btn flat color="primary" :label="$t('cancel')" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'StartDialog',
  props: {
    title: {
      type: String
    },
    recordScore: {
      type: Boolean,
      default: false
    },
    recordTime: {
      type: Boolean,
      default: false
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
      equationType: 1,
      typeOptions: [
        { label: this.$t('below10'), value: 1 },
        { label: this.$t('below50_1'), value: 2 },
        { label: this.$t('below50_2'), value: 3 },
        { label: this.$t('below100_1'), value: 4 },
        { label: this.$t('below100_2'), value: 5 },
      ],
      equationNumber: 10,
      limitMinutes: 1,
      scoreEach: 10
    }
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
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
      this.$emit('ok', this.getData())
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick () {
      // we just need to hide the dialog
      this.hide()
    },
    
    getData () {
      return {
        equationType: this.equationType,
        equationNumber: this.equationNumber,
        scoreEach: this.recordScore ? this.scoreEach : null,
        limitMinutes: this.recordTime ? this.limitMinutes : null
      }
    }
  }
}
</script>
