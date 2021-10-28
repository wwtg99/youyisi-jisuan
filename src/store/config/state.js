export default function () {
  return {
    config_key: '_jisuan_config_',
    local: {
      keyboardFold: false
    },
    linkMenus: [
      [
        { label: 'practice', name: 'playground', img: 'exercise', recordScore: false, recordTime: false },
        { label: 'challenge', name: 'playground', img: 'challenge', recordScore: true, recordTime: false },
        { label: 'time_challenge', name: 'playground', img: 'timer', recordScore: true, recordTime: true },
      ]
    ]
  }
}
