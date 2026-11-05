import { onMounted, onUnmounted, type Ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Curvas equivalentes a $ease-out / $ease-in-out de tokens.scss
export const EASE_OUT = 'expo.out'
export const EASE_IN_OUT = 'power3.inOut'

export interface MotionEnv {
  reduce: boolean
  desktop: boolean
}

// Corre las animaciones de un componente dentro de un gsap.context con alcance al root:
// los selectores solo buscan dentro de él y todo se revierte al desmontar.
export function useMotion(root: Ref<HTMLElement | null>, setup: (env: MotionEnv) => void) {
  let ctx: gsap.Context | undefined

  onMounted(() => {
    if (!root.value) return
    const env: MotionEnv = {
      reduce: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      desktop: window.matchMedia('(min-width: 1080px)').matches,
    }
    ctx = gsap.context(() => setup(env), root.value)
  })

  onUnmounted(() => ctx?.revert())
}

// Contador que sube hasta el valor final cuando entra en pantalla
export function countUp(el: HTMLElement, to: number, reduce: boolean) {
  if (reduce) {
    el.textContent = String(to)
    return
  }
  const state = { n: 0 }
  gsap.to(state, {
    n: to,
    duration: 1.6,
    ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    onUpdate: () => {
      el.textContent = String(Math.round(state.n))
    },
  })
}

// Parallax suave de una imagen dentro de su marco (el marco debe tener overflow: hidden)
export function parallax(img: Element, amount = 10) {
  gsap.fromTo(
    img,
    { yPercent: -amount / 2, scale: 1.12 },
    {
      yPercent: amount / 2,
      ease: 'none',
      scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    },
  )
}

export { gsap, ScrollTrigger }
