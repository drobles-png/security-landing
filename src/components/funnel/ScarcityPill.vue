<script setup lang="ts">
import { SCARCITY } from '@/config/copy'
</script>

<template>
  <p class="pill">
    <span class="pill__dot"></span>
    <span>Quedan <b>{{ SCARCITY.slots }} cupos</b> de {{ SCARCITY.unit }}</span>
  </p>
</template>

<style scoped lang="scss">
@keyframes pulse {
  from {
    transform: scale(1);
    opacity: 0.7;
  }
  to {
    transform: scale(2.6);
    opacity: 0;
  }
}

.pill {
  @include label;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  padding: 8px 14px;
  border: 1px solid rgba($accent, 0.45);
  background: rgba($accent, 0.08);
  color: #dfe4ec;
  font-size: 0.66rem;
  text-align: left;

  b {
    color: $accent-light;
    font-weight: 500;
  }

  // Punto con onda: señal de "en vivo"
  &__dot {
    flex: none;
    position: relative;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: $accent-light;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: inherit;
      animation: pulse 1.8s ease-out infinite;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .pill__dot::after {
    animation: none;
  }
}
</style>
