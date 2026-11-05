<script setup lang="ts">
import { SCARCITY } from '@/config/copy'
import { useDeadline } from '@/composables/useDeadline'
import BrandLogo from '@/components/ui/BrandLogo.vue'

const left = useDeadline()
</script>

<template>
  <header class="urgency">
    <div class="urgency__inner">
      <BrandLogo class="urgency__logo" />
      <p class="urgency__text">
        <span class="urgency__dot"></span>
        <span class="urgency__copy">{{ SCARCITY.bar }}</span>
        <span class="urgency__clock" aria-live="off">
          <b>{{ left.h }}</b><small>h</small> : <b>{{ left.m }}</b><small>m</small> :
          <b>{{ left.s }}</b><small>s</small>
        </span>
      </p>
    </div>
  </header>
</template>

<style scoped lang="scss">
@keyframes blink {
  50% {
    opacity: 0.25;
  }
}

.urgency {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba($ink, 0.9);
  backdrop-filter: blur(14px) saturate(1.3);
  border-bottom: 1px solid rgba($accent, 0.45);

  &__inner {
    @include container;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    min-height: 52px;

    @include from('lg') {
      justify-content: space-between;
    }
  }

  // El logo solo en desktop: en móvil la barra es solo urgencia
  &__logo {
    display: none !important;

    @include from('lg') {
      display: inline-flex !important;
    }
  }

  &__text {
    @include label;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 6px 12px;
    margin: 0;
    padding-block: 8px;
    color: #dfe4ec;
    font-size: 0.66rem;
    text-align: center;
  }

  &__copy {
    display: none;

    @include from('md') {
      display: inline;
    }
  }

  &__dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: $accent-light;
    animation: blink 1.6s ease-in-out infinite;
  }

  &__clock {
    color: $muted;
    font-variant-numeric: tabular-nums;

    b {
      color: $accent-light;
      font-size: 0.95rem;
      font-weight: 500;
    }

    small {
      margin-left: 1px;
      font-size: 0.6rem;
    }

    // En móvil el texto largo se oculta: anteponemos una etiqueta corta
    &::before {
      content: 'Cupo de hoy cierra en ';
      color: #dfe4ec;

      @include from('md') {
        content: none;
      }
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .urgency__dot {
    animation: none;
  }
}
</style>
