<script setup lang="ts">
import { ref } from 'vue'
import { CLOSING, IMAGES, TAGLINE, VALUES } from '@/config/copy'
import MarqueeBand from './MarqueeBand.vue'
import { parallax, useMotion } from '@/composables/useMotion'

withDefaults(defineProps<{ ctaLabel?: string; ctaIcon?: string; disabled?: boolean }>(), {
  ctaIcon: 'fa-arrow-right',
})
defineEmits<{ cta: [] }>()

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }) => {
  if (!reduce) parallax(root.value!.querySelector('.closing__bg')!, 18)
})
</script>

<template>
  <section ref="root" class="closing">
    <MarqueeBand :items="VALUES" variant="outline" reverse />
    <div class="closing__hero">
      <div class="closing__media">
        <img class="closing__bg" :src="IMAGES.closing" alt="" loading="lazy" decoding="async" />
      </div>
      <div class="closing__inner">
        <span v-reveal class="closing__tag">{{ TAGLINE }}</span>
        <h2 v-reveal="1">{{ CLOSING.title }}</h2>
        <p v-reveal="2">{{ CLOSING.text }}</p>
        <button
          v-reveal="3"
          class="btn btn--primary"
          type="button"
          :disabled="disabled"
          @click="$emit('cta')"
        >
          {{ ctaLabel ?? CLOSING.cta }} <i class="fa-solid" :class="ctaIcon"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.closing {
  background: $ink;
  padding-top: 72px;

  &__hero {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    margin-top: 72px;
  }

  &__media {
    position: absolute;
    inset: 0;
    z-index: -1;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background:
        linear-gradient(90deg, rgba($ink, 0.95) 0%, rgba($ink, 0.7) 50%, rgba($ink, 0.35) 100%),
        linear-gradient(0deg, $ink 0%, transparent 40%);
    }
  }

  &__bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__inner {
    @include container;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 22px;
    padding-block: 120px;

    @include from('md') {
      padding-block: 180px;
    }
  }

  &__tag {
    @include eyebrow;
  }

  h2 {
    @include display(clamp(2.2rem, 6vw, 4.6rem));
    max-width: 900px;
    color: #fff;
  }

  p {
    max-width: 540px;
    color: #c5ccd9;
    font-size: 1.15rem;
  }

  .btn {
    margin-top: 10px;
  }
}
</style>
