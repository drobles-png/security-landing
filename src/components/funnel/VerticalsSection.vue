<script setup lang="ts">
import { ref } from 'vue'
import { VERTICALS, VERTICALS_HEAD } from '@/config/copy'
import SectionHead from '@/components/ui/SectionHead.vue'

// En desktop un panel queda abierto; al pasar el mouse o enfocar se abre otro
const active = ref(1)
</script>

<template>
  <section id="servicios" class="section verticals">
    <div class="verticals__inner">
      <SectionHead
        v-reveal
        :index="VERTICALS_HEAD.index"
        :eyebrow="VERTICALS_HEAD.eyebrow"
        :title="VERTICALS_HEAD.title"
        :intro="VERTICALS_HEAD.intro"
      />
    </div>
    <ul class="verticals__panels">
      <li
        v-for="(v, i) in VERTICALS"
        :key="v.code"
        v-reveal="i"
        class="panel"
        :class="{ 'panel--active': active === i }"
        tabindex="0"
        @mouseenter="active = i"
        @focus="active = i"
      >
        <img :src="v.image" alt="" loading="lazy" decoding="async" />
        <span class="panel__code">{{ String(i + 1).padStart(2, '0') }} / {{ v.code }}</span>
        <div class="panel__body">
          <h3>{{ v.title }}</h3>
          <div class="panel__more">
            <p>{{ v.text }}</p>
            <ul class="panel__tags">
              <li v-for="t in v.tags" :key="t">{{ t }}</li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.verticals {
  background: $ink;

  &__inner {
    @include container;
  }

  // Móvil: carrusel con snap. Desktop: cuatro paneles en fila que se expanden
  &__panels {
    display: flex;
    gap: 12px;
    margin: 0;
    padding: 0 20px 4px;
    list-style: none;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding-inline: 20px;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    @include from('lg') {
      @include container;
      height: 600px;
      overflow: visible;
      gap: 10px;
    }
  }
}

.panel {
  position: relative;
  flex: 0 0 82%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  isolation: isolate;
  scroll-snap-align: start;
  background: $surface;
  outline-offset: -2px;
  cursor: default;

  @include from('sm') {
    flex-basis: 48%;
  }

  @include from('lg') {
    flex: 1 1 0;
    aspect-ratio: auto;
    // flex-grow anima el ancho: son solo cuatro paneles y es la interacción central
    transition: flex-grow 700ms $ease-in-out;

    &--active {
      flex-grow: 2.6;
    }
  }

  img {
    position: absolute;
    inset: 0;
    z-index: -2;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(0.35) brightness(0.85);
    transition:
      filter 700ms ease,
      transform 1200ms $ease-out;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(180deg, rgba($ink, 0.15) 20%, rgba($ink, 0.55) 55%, rgba($ink, 0.96) 100%);
  }

  // Línea roja superior que se llena en el panel activo
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    height: 3px;
    background: $accent;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 700ms $ease-in-out;
  }

  &__code {
    @include label;
    position: absolute;
    top: 22px;
    left: 22px;
    color: rgba(255, 255, 255, 0.75);
  }

  &__body {
    position: absolute;
    inset: auto 0 0;
    padding: 26px 22px;
  }

  h3 {
    @include heading(clamp(1.35rem, 2.2vw, 1.75rem));
    max-width: 320px;
    color: #fff;
  }

  p {
    margin-top: 10px;
    max-width: 360px;
    color: #c5ccd9;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 16px 0 0;
    padding: 0;
    list-style: none;

    li {
      @include label;
      padding: 6px 10px;
      border: 1px solid rgba(255, 255, 255, 0.28);
      color: #fff;
      font-size: 0.64rem;
    }
  }

  // Desktop: el texto extra aparece solo en el panel abierto
  @include from('lg') {
    &__more {
      opacity: 0;
      transform: translateY(12px);
      transition:
        opacity 300ms ease,
        transform 300ms ease;
    }

    &--active &__more {
      opacity: 1;
      transform: none;
      transition:
        opacity 500ms ease 300ms,
        transform 600ms $ease-out 300ms;
    }

    &--active img {
      filter: grayscale(0) brightness(1);
      transform: scale(1.04);
    }

    &--active::before {
      transform: scaleX(1);
    }
  }
}
</style>
