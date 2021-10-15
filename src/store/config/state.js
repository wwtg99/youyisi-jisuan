export default function () {
  return {
    config_key: '_jisuan_config_',
    local: {
      keyboardFold: false
    },
    linkMenus: [
      [
        { label: 'practice', name: 'playground', recordScore: false, recordTime: false },
        { label: 'challenge', name: 'playground', recordScore: true, recordTime: false },
        { label: 'time_challenge', name: 'playground', recordScore: true, recordTime: true },
      ]
    ]
  }
}
