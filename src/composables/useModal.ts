import { ref, watch, onUnmounted, type Ref } from 'vue'

// Estado compartido para abrir el registro desde cualquier CTA de la página
const registrationOpen = ref(false)

export function useRegistrationModal() {
  return {
    isOpen: registrationOpen,
    open: () => (registrationOpen.value = true),
    close: () => (registrationOpen.value = false),
  }
}

// Bloquea el scroll del body y cierra con Escape mientras el modal esté abierto
export function useModalBehavior(open: Ref<boolean>, close: () => void) {
  const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()

  watch(
    open,
    (v) => {
      document.body.style.overflow = v ? 'hidden' : ''
      if (v) document.addEventListener('keydown', onKey)
      else document.removeEventListener('keydown', onKey)
    },
    { immediate: true },
  )

  onUnmounted(() => {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', onKey)
  })
}
