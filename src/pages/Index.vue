<template>
  <q-page class="flex flex-center">
    <div class="title">title</div>
    <div class="link-menus">
      <div v-for="row, i in linkMenus" :key="i" class="row q-gutter-md justify-center">
        <q-card v-for="item in row" :key="item.name" class="link col-3" @click="clickLink(item)">
          <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
            <div class="absolute-bottom text-subtitle2 text-center">
              {{ $t(item.label) }}
            </div>
          </q-img>
        </q-card>
      </div>
    </div>
    <start-dialog ref="startDialog" :title="dialogTitle" :recordScore="recordScore" :recordTime="recordTime" @ok="clickStartOk"></start-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import StartDialog from 'components/StartDialog'

export default defineComponent({
  name: 'PageIndex',
  components: { StartDialog },
  setup () {
    
  },
  data () {
    return {
      dialogTitle: '',
      recordScore: false,
      recordTime: false
    }
  },
  computed: {
    linkMenus () {
      return this.$store.state.config.linkMenus
    }
  },
  methods: {
    clickLink (item) {
      this.dialogTitle = item.label
      this.recordScore = item.recordScore
      this.recordTime = item.recordTime
      this.$refs['startDialog'].show()
    },
    clickStartOk (d) {
      console.log(d)
      this.$store.commit('equation/setConfig', d)
      this.$store.commit('equation/generate')
      this.$router.push({name: 'playground'})
    }
  }
})
</script>
<style lang="sass" scoped>
.link-menus
  width: 100%
.link
  width: 100%
  max-width: 250px
  cursor: pointer
</style>
