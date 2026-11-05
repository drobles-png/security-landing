import { computed, onUnmounted, ref } from 'vue'

// Desbloquea el CTA después de que el lead vio parte del video
export function useCountdown(seconds: number) {
  const left = ref(seconds)
  const done = computed(() => left.value <= 0)
  const label = computed(
    () => `${Math.floor(left.value / 60)}:${String(left.value % 60).padStart(2, '0')}`,
  )
  let timer: ReturnType<typeof setInterval> | undefined

  function start() {
    if (timer) return
    timer = setInterval(() => {
      left.value = Math.max(0, left.value - 1)
      if (done.value) clearInterval(timer)
    }, 1000)
  }

  onUnmounted(() => clearInterval(timer))

  return { left, done, label, start }
}
