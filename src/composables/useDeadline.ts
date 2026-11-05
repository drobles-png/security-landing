import { onMounted, onUnmounted, ref } from 'vue'

// Tiempo que falta para la medianoche de Guayaquil (UTC-5, sin horario de verano).
// Se reinicia cada día: la urgencia es diaria, no una fecha fija que caduque.
const OFFSET_MS = -5 * 60 * 60 * 1000
const DAY_MS = 24 * 60 * 60 * 1000

function msToMidnight() {
  const local = Date.now() + OFFSET_MS
  return DAY_MS - (local % DAY_MS)
}

export function useDeadline() {
  const parts = ref({ h: '00', m: '00', s: '00' })
  let timer: ReturnType<typeof setInterval> | undefined

  function tick() {
    const total = Math.floor(msToMidnight() / 1000)
    const pad = (n: number) => String(n).padStart(2, '0')
    parts.value = {
      h: pad(Math.floor(total / 3600)),
      m: pad(Math.floor((total % 3600) / 60)),
      s: pad(total % 60),
    }
  }

  onMounted(() => {
    tick()
    timer = setInterval(tick, 1000)
  })
  onUnmounted(() => clearInterval(timer))

  return parts
}
