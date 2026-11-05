<script setup lang="ts">
import { ref } from 'vue'
import { TRAINING } from '@/config/copy'
import SectionHead from '@/components/ui/SectionHead.vue'
import { gsap, useMotion } from '@/composables/useMotion'

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce, desktop }) => {
  if (reduce) return
  // Cada foto del collage se mueve a su propia velocidad: da profundidad
  if (desktop) {
    gsap.utils.toArray<HTMLElement>('.collage__item').forEach((el, i) => {
      gsap.to(el, {
        yPercent: [-12, 10, -20][i] ?? 0,
        ease: 'none',
        scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    })
  }
  // Los criterios entran con su línea dibujándose de izquierda a derecha
  gsap.from('.criteria li', {
    '--line': 0,
    opacity: 0,
    y: 16,
    duration: 0.9,
    stagger: 0.1,
    ease: 'expo.out',
    scrollTrigger: { trigger: '.criteria', start: 'top 80%', once: true },
  })
})
</script>

<template>
  <section ref="root" class="section training">
    <div class="training__inner">
      <div class="training__copy">
        <SectionHead :index="TRAINING.index" :eyebrow="TRAINING.eyebrow" :title="TRAINING.title" :intro="TRAINING.intro" />
        <ol class="criteria">
          <li v-for="(c, i) in TRAINING.items" :key="c">
            <span>{{ String(i + 1).padStart(2, '0') }}</span>
            {{ c }}
          </li>
        </ol>
      </div>
      <div class="collage">
        <figure
          v-for="(p, i) in TRAINING.photos"
          :key="p.src"
          class="collage__item"
          :class="`collage__item--${i}`"
        >
          <img :src="p.src" alt="" :width="p.w" :height="p.h" loading="lazy" decoding="async" />
          <figcaption>{{ p.caption }}</figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.training {
  background: $surface;
  overflow: hidden;

  &__inner {
    @include container;
    display: flex;
    flex-direction: column;
    gap: 64px;

    @include from('lg') {
      flex-direction: row;
      align-items: center;
      gap: 80px;
    }
  }

  &__copy {
    flex: 1 1 50%;
  }
}

.criteria {
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    --line: 1;
    position: relative;
    display: flex;
    align-items: baseline;
    gap: 24px;
    padding-block: 20px;
    font-family: $font-heading;
    font-stretch: 108%;
    font-weight: 600;
    font-size: clamp(1.1rem, 2vw, 1.35rem);
    color: #fff;

    // Divisor que GSAP "dibuja" animando --line de 0 a 1
    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1px;
      background: $line;
      transform: scaleX(var(--line));
      transform-origin: left;
    }
  }

  span {
    @include label;
    color: $accent-light;
  }
}

// Collage: una vertical grande y dos horizontales superpuestas
.collage {
  position: relative;
  flex: 1 1 50%;
  min-height: 520px;

  @include from('lg') {
    min-height: 640px;
  }

  &__item {
    position: absolute;
    margin: 0;
    overflow: hidden;
    box-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.8);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    figcaption {
      @include label;
      position: absolute;
      left: 0;
      bottom: 0;
      padding: 8px 12px;
      background: $accent;
      color: #fff;
      font-size: 0.62rem;
    }

    &--0 {
      top: 0;
      left: 0;
      width: 58%;
      height: 78%;
    }

    &--1 {
      top: 10%;
      right: 0;
      width: 50%;
      height: 38%;
      z-index: 1;
    }

    &--2 {
      bottom: 0;
      right: 6%;
      width: 56%;
      height: 40%;
      z-index: 2;
      outline: 8px solid $surface;
    }
  }
}
</style>
