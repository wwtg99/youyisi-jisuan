<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-icon name="today"></q-icon>

        <q-toolbar-title>
          <q-btn flat :to="{ name: 'index' }">{{ $t('app_title') }}</q-btn>
        </q-toolbar-title>

        <div>
          <q-select
            v-model="locale"
            :options="localeOptions"
            :label="$t('language')"
            dense
            borderless
            emit-value
            map-options
            options-dense
            style="min-width: 150px;"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'MainLayout',
  components: {},
  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
      localeOptions: [
        { value: 'en-US', label: '英文 English' },
        { value: 'cn-ZH', label: '中文 Chinese' }
      ]
    }
  },
  created () {
    // load config
    this.$store.dispatch('config/load')
  }
})
</script>
