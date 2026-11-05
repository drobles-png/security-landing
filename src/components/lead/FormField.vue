<script setup lang="ts">
defineProps<{ id: string; label: string; error?: string }>()
</script>

<template>
  <div class="field" :class="{ 'field--error': error }">
    <label :for="id">{{ label }}</label>
    <slot />
    <small v-if="error" class="field__error" role="alert">{{ error }}</small>
  </div>
</template>

<style scoped lang="scss">
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 0.82rem;
    font-weight: 600;
    color: $muted;
  }

  :slotted(input),
  :slotted(select),
  :slotted(textarea) {
    width: 100%;
    min-height: 48px;
    padding: 12px 14px;
    border: 1px solid $line;
    border-radius: $radius-sm;
    background: $ink;
    color: $text;
    font: inherit;
    font-size: 16px; // evita el zoom automático en iOS

    &:focus {
      outline: none;
      border-color: $accent;
    }
  }

  &--error {
    :slotted(input),
    :slotted(select),
    :slotted(textarea) {
      border-color: $danger;
    }
  }

  &__error {
    color: $danger;
    font-size: 0.8rem;
  }
}
</style>
