<script setup lang="ts">
import { ref } from 'vue'
import { STATS } from '@/config/copy'
import { countUp, useMotion } from '@/composables/useMotion'

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }) => {
  root.value!.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    countUp(el, Number(el.dataset.count), reduce)
  })
})
</script>

<template>
  <section ref="root" class="stats" aria-label="Browinn en cifras">
    <ul class="stats__inner">
      <li v-for="(s, i) in STATS" :key="s.label" v-reveal="i">
        <strong
          ><span :data-count="s.value">{{ s.value }}</span
          ><em>{{ s.suffix }}</em></strong
        >
        <span class="stats__label">{{ s.label }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.stats {
  background: $ink;
  border-bottom: 1px solid $line;

  &__inner {
    @include container;
    display: flex;
    flex-wrap: wrap;
    margin-block: 0;
    list-style: none;

    li {
      display: flex;
      flex: 1 1 50%;
      flex-direction: column;
      gap: 10px;
      padding: 36px 16px 36px 0;
      border-bottom: 1px solid $line;

      @include from('md') {
        flex-basis: 25%;
        padding: 56px 32px;
        border-bottom: 0;
        border-left: 1px solid $line;

        &:first-child {
          padding-left: 0;
          border-left: 0;
        }
      }
    }

    strong {
      font-family: $font-heading;
      font-stretch: 125%;
      font-weight: 800;
      font-size: clamp(2.6rem, 6vw, 4.2rem);
      line-height: 1;
      letter-spacing: -0.03em;
      color: #fff;
      // Ancho fijo por dígito: el contador no hace saltar el layout
      font-variant-numeric: tabular-nums;
    }

    em {
      font-style: normal;
      color: $accent-light;
    }
  }

  &__label {
    @include label;
    max-width: 220px;
    color: $muted;
    line-height: 1.6;
  }
}
</style>
