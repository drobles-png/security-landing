<script setup lang="ts">
import { PROOF } from '@/config/copy'

defineEmits<{ cta: [] }>()
</script>

<template>
  <section class="proof">
    <div class="proof__inner">
      <span v-reveal class="proof__eyebrow">{{ PROOF.eyebrow }}</span>
      <ul class="proof__grid">
        <li v-for="(p, i) in PROOF.items" :key="p.value" v-reveal="i" class="proof__card">
          <strong>{{ p.value }}</strong>
          <span>{{ p.label }}</span>
        </li>
      </ul>
      <button v-reveal="3" class="btn btn--ghost" type="button" @click="$emit('cta')">
        {{ PROOF.cta }} <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.proof {
  padding-block: 80px;
  background: $surface;
  border-block: 1px solid $line;

  @include from('md') {
    padding-block: 104px;
  }

  &__inner {
    @include container(1000px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    text-align: center;
  }

  &__eyebrow {
    @include label;
    color: $accent-light;
  }

  &__grid {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
    border: 1px solid $line;

    @include from('md') {
      flex-direction: row;
    }
  }

  &__card {
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    padding: 40px 28px;

    & + & {
      border-top: 1px solid $line;

      @include from('md') {
        border-top: 0;
        border-left: 1px solid $line;
      }
    }

    // Marca roja corta arriba de cada cifra
    &::before {
      content: '';
      position: absolute;
      top: -1px;
      left: 50%;
      width: 40px;
      height: 2px;
      background: $accent;
      transform: translateX(-50%);
    }

    strong {
      font-family: $font-heading;
      font-stretch: 125%;
      font-weight: 800;
      font-size: clamp(2.6rem, 6vw, 3.6rem);
      line-height: 1;
      color: #fff;
    }

    span {
      max-width: 260px;
      color: $muted;
      font-size: 1rem;
      line-height: 1.5;
    }
  }
}
</style>
