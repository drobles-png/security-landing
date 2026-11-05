<script setup lang="ts">
import { ref } from 'vue'
import { PROTOCOL } from '@/config/copy'
import { gsap, useMotion } from '@/composables/useMotion'

const root = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce, desktop }) => {
  if (reduce) return
  if (desktop) {
    // Sección fijada: el scroll vertical mueve los pasos en horizontal
    const distance = () => track.value!.scrollWidth - window.innerWidth + 80
    gsap
      .timeline({
        scrollTrigger: {
          trigger: root.value,
          pin: true,
          scrub: 0.8,
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
        },
      })
      .to(track.value, { x: () => -distance(), ease: 'none' }, 0)
      .fromTo('.protocol__bar', { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0)
  } else {
    gsap.fromTo(
      '.protocol__bar',
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: track.value, start: 'top 70%', end: 'bottom 70%', scrub: true },
      },
    )
  }
})
</script>

<template>
  <section id="protocolo" ref="root" class="protocol">
    <div class="protocol__head">
      <span class="protocol__eyebrow"><b>{{ PROTOCOL.index }}</b> {{ PROTOCOL.eyebrow }}</span>
      <h2>{{ PROTOCOL.title }}</h2>
      <p>{{ PROTOCOL.intro }}</p>
    </div>
    <div class="protocol__viewport">
      <span class="protocol__bar"></span>
      <ol ref="track" class="protocol__track">
        <li v-for="(s, i) in PROTOCOL.steps" :key="s.title" class="step">
          <span class="step__num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="step__label">Paso {{ i + 1 }} de {{ PROTOCOL.steps.length }}</span>
          <h3>{{ s.title }}</h3>
          <p>{{ s.text }}</p>
        </li>
        <li class="step step--promise">
          <span class="step__label">Nuestro compromiso</span>
          <p>{{ PROTOCOL.promise }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped lang="scss">
.protocol {
  position: relative;
  padding-block: 96px;
  overflow: hidden;
  background: $ink;

  @include from('lg') {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    padding-block: 96px 64px;
  }

  &__head {
    @include container;
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-bottom: 56px;

    h2 {
      @include display(clamp(1.9rem, 4.6vw, 3.4rem));
      max-width: 900px;
      color: #fff;
    }

    p {
      max-width: 560px;
      color: $muted;
      font-size: 1.15rem;
    }
  }

  &__eyebrow {
    @include label;
    color: $muted;

    b {
      margin-right: 12px;
      color: $accent-light;
      font-weight: 500;
    }
  }

  &__viewport {
    @include container;
    position: relative;

    @include from('lg') {
      max-width: none;
      padding-inline: 0;
      padding-left: max(40px, calc((100vw - #{$container}) / 2 + 40px));
    }
  }

  // Barra de avance: vertical en móvil, horizontal en desktop
  &__bar {
    position: absolute;
    top: 0;
    left: 20px;
    width: 2px;
    height: 100%;
    background: $accent;
    transform-origin: top;

    @include from('lg') {
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      transform-origin: left;
    }
  }

  &__track {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    list-style: none;
    border-left: 1px solid $line;

    @include from('lg') {
      flex-direction: row;
      width: max-content;
      border-left: 0;
      border-top: 1px solid $line;
    }
  }
}

.step {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 0 48px 32px;

  @include from('lg') {
    width: 400px;
    padding: 44px 48px 0 0;
    margin-right: 48px;
  }

  // Número gigante en contorno: la pieza visual de cada paso
  &__num {
    font-family: $font-heading;
    font-stretch: 125%;
    font-weight: 900;
    font-size: clamp(4rem, 9vw, 7.5rem);
    line-height: 0.85;
    color: transparent;
    -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.35);
  }

  &__label {
    @include label;
    margin-top: 12px;
    color: $accent-light;
  }

  h3 {
    @include heading(clamp(1.35rem, 2.2vw, 1.7rem));
    color: #fff;
  }

  p {
    color: $muted;
    font-size: 1.05rem;
  }

  &--promise {
    justify-content: center;

    @include from('lg') {
      width: 460px;
      padding: 44px 40px;
      margin-top: 44px;
      background: $accent;

      .step__label,
      p {
        color: #fff;
      }
    }

    p {
      @include heading(clamp(1.2rem, 2vw, 1.5rem));
      color: #fff;
    }
  }
}
</style>
