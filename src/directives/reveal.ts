import type { Directive } from 'vue'

// v-reveal: el elemento aparece al entrar en pantalla, una sola vez.
// v-reveal="2" escalona: retrasa la entrada 2 × 70 ms (ver [data-reveal] en global.scss).
const observer =
  typeof IntersectionObserver === 'undefined'
    ? null
    : new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            const el = entry.target as HTMLElement
            el.classList.add('is-visible')
            observer?.unobserve(el)
            // Al terminar, devolvemos el elemento a sus propias transiciones (hover, press)
            // para que no hereden el retraso del escalonado
            const delay = Number(el.style.getPropertyValue('--i') || 0) * 60
            setTimeout(() => {
              delete el.dataset.reveal
              el.classList.remove('is-visible')
            }, delay + 900)
          }
        },
        { rootMargin: '0px 0px -8% 0px' },
      )

export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, { value }) {
    el.dataset.reveal = ''
    if (value) el.style.setProperty('--i', String(value))
    if (observer) observer.observe(el)
    else el.classList.add('is-visible')
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}

declare module 'vue' {
  interface GlobalDirectives {
    vReveal: typeof vReveal
  }
}
