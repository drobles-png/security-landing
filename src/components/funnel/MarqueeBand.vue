<script setup lang="ts">
withDefaults(defineProps<{ items: string[]; reverse?: boolean; variant?: 'red' | 'outline' }>(), {
  variant: 'red',
})
</script>

<template>
  <!-- La lista va duplicada: el track se desplaza -50% y el bucle no tiene corte -->
  <div class="marquee" :class="[`marquee--${variant}`, { 'marquee--reverse': reverse }]" aria-hidden="true">
    <div class="marquee__track">
      <template v-for="n in 2" :key="n">
        <span v-for="item in items" :key="`${n}-${item}`" class="marquee__item">{{ item }}</span>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}

.marquee {
  overflow: hidden;
  user-select: none;

  &__track {
    display: flex;
    width: max-content;
    // Movimiento constante: lineal
    animation: marquee 40s linear infinite;
  }

  &--reverse &__track {
    animation-direction: reverse;
  }

  @include hover {
    .marquee__track {
      animation-play-state: paused;
    }
  }

  &__item {
    display: inline-flex;
    align-items: center;
    white-space: nowrap;

    // Separador en forma de rombo
    &::after {
      content: '';
      width: 8px;
      height: 8px;
      margin-inline: 32px;
      transform: rotate(45deg);
      background: currentColor;
      opacity: 0.6;
    }
  }

  &--red {
    padding-block: 18px;
    background: $accent;
    color: #fff;

    .marquee__item {
      font-family: $font-heading;
      font-stretch: 125%;
      font-weight: 800;
      font-size: clamp(0.9rem, 1.8vw, 1.15rem);
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
  }

  // Palabras gigantes en contorno, para la banda de valores
  &--outline {
    padding-block: 24px;

    .marquee__item {
      font-family: $font-heading;
      font-stretch: 125%;
      font-weight: 900;
      font-size: clamp(2.6rem, 8vw, 6.5rem);
      line-height: 1;
      text-transform: uppercase;
      color: transparent;
      -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.28);

      &:nth-child(odd) {
        color: rgba(255, 255, 255, 0.92);
        -webkit-text-stroke: 0;
      }

      &::after {
        background: $accent;
        opacity: 1;
        width: 14px;
        height: 14px;
        margin-inline: 40px;
      }
    }

    .marquee__track {
      animation-duration: 60s;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee__track {
    animation: none;
  }
}
</style>
