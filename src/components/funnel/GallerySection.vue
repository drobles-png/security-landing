<script setup lang="ts">
import { ref } from 'vue'
import { GALLERY } from '@/config/copy'
import SectionHead from '@/components/ui/SectionHead.vue'
import { gsap, useMotion } from '@/composables/useMotion'

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }) => {
  if (reduce) return
  // Cada foto se destapa de abajo hacia arriba y la imagen se asienta desde un zoom leve
  gsap.utils.toArray<HTMLElement>('.shot').forEach((el, i) => {
    gsap
      .timeline({ scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
      .from(el, { clipPath: 'inset(100% 0 0 0)', duration: 1.1, ease: 'power3.inOut', delay: (i % 3) * 0.08 })
      .from(el.querySelector('img'), { scale: 1.25, duration: 1.4, ease: 'expo.out' }, '<0.2')
  })
})
</script>

<template>
  <section id="operacion" ref="root" class="section gallery">
    <div class="gallery__inner">
      <SectionHead v-reveal :index="GALLERY.index" :eyebrow="GALLERY.eyebrow" :title="GALLERY.title" />
      <div class="gallery__grid">
        <figure v-for="(p, i) in GALLERY.photos" :key="p.src" class="shot" :class="`shot--${i}`">
          <img :src="p.src" alt="" :width="p.w" :height="p.h" loading="lazy" decoding="async" />
          <figcaption>
            <span>{{ String(i + 1).padStart(2, '0') }}</span> {{ p.caption }}
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.gallery {
  background: $ink;

  &__inner {
    @include container;
  }

  // Bento: 2 columnas en móvil, 4 columnas con piezas de distinto tamaño en desktop
  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 180px;
    grid-auto-flow: dense;
    gap: 8px;

    @include from('md') {
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: 220px;
      gap: 12px;
    }
  }
}

.shot {
  position: relative;
  margin: 0;
  overflow: hidden;
  background: $surface;

  // Móvil (con auto-flow dense): 5 filas sin huecos
  &--0,
  &--2 {
    grid-row: span 2;
  }

  &--1 {
    grid-column: span 2;
  }

  // Desktop: posiciones explícitas en una grilla de 4×4
  @include from('md') {
    &--0 { grid-area: 1 / 1 / 3 / 3; }
    &--1 { grid-area: 1 / 3 / 2 / 5; }
    &--3 { grid-area: 2 / 3 / 3 / 4; }
    &--4 { grid-area: 2 / 4 / 3 / 5; }
    &--2 { grid-area: 3 / 1 / 5 / 2; }
    &--5 { grid-area: 3 / 2 / 5 / 3; }
    &--6 { grid-area: 3 / 3 / 5 / 5; }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition:
      transform 900ms $ease-out,
      filter 500ms ease;
  }

  // Esquinas tácticas que se cierran sobre la foto al pasar el mouse
  &::after {
    content: '';
    position: absolute;
    inset: 14px;
    @include brackets(#fff, 20px);
    opacity: 0;
    transform: scale(1.06);
    transition:
      opacity 300ms ease,
      transform 400ms $ease-out;
    pointer-events: none;
  }

  figcaption {
    @include label;
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    gap: 10px;
    padding: 10px 14px;
    background: rgba($ink, 0.85);
    color: #fff;
    font-size: 0.62rem;

    span {
      color: $accent-light;
    }
  }

  @include hover {
    img {
      transform: scale(1.05);
    }

    &::after {
      opacity: 1;
      transform: none;
    }
  }
}
</style>
