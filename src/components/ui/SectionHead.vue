<script setup lang="ts">
defineProps<{
  index?: string
  eyebrow?: string
  title: string
  intro?: string
  center?: boolean
  light?: boolean
}>()
</script>

<template>
  <div class="head" :class="{ 'head--center': center, 'head--light': light }">
    <span v-if="eyebrow" class="head__eyebrow">
      <b v-if="index">{{ index }}</b> {{ eyebrow }}
    </span>
    <h2 class="head__title">{{ title }}</h2>
    <p v-if="intro" class="head__intro">{{ intro }}</p>
  </div>
</template>

<style scoped lang="scss">
.head {
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 820px;
  margin-bottom: 48px;

  @include from('md') {
    margin-bottom: 64px;
  }

  &--center {
    margin-inline: auto;
    text-align: center;
    align-items: center;
  }

  // "01 — SERVICIOS": índice en rojo, etiqueta en gris
  &__eyebrow {
    @include label;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    color: $muted;

    b {
      color: $accent-light;
      font-weight: 500;

      &::after {
        content: '';
        display: inline-block;
        width: 28px;
        height: 1px;
        margin-left: 12px;
        vertical-align: middle;
        background: currentColor;
      }
    }
  }

  &__title {
    @include display(clamp(1.9rem, 4.6vw, 3.4rem));
    color: $text;
  }

  &__intro {
    max-width: 620px;
    color: $muted;
    font-size: 1.15rem;
    line-height: 1.55;
    text-wrap: pretty;
  }

  &--light {
    .head__eyebrow {
      color: $paper-muted;

      b {
        color: $accent;
      }
    }

    .head__title {
      color: $paper-text;
    }

    .head__intro {
      color: $paper-muted;
    }
  }
}
</style>
