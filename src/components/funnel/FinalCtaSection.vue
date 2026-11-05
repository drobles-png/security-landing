<script setup lang="ts">
import { ref } from 'vue'
import { FINAL_CTA, IMAGES, LANDING_HERO } from '@/config/copy'
import ScarcityPill from './ScarcityPill.vue'
import { parallax, useMotion } from '@/composables/useMotion'

defineEmits<{ cta: [] }>()

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }) => {
  if (!reduce) parallax(root.value!.querySelector('.final__bg')!, 18)
})
</script>

<template>
  <section ref="root" class="final">
    <div class="final__media">
      <img class="final__bg" :src="IMAGES.closing" alt="" loading="lazy" decoding="async" />
    </div>
    <div class="final__inner">
      <img v-reveal class="final__logo" src="/browinn-logo.jpg" alt="Browinn Security" width="72" height="72" />
      <h2 v-reveal="1">
        {{ FINAL_CTA.question }} <em>{{ FINAL_CTA.accent }}</em>
      </h2>
      <p v-reveal="2">{{ FINAL_CTA.text }}</p>
      <div v-reveal="3" class="final__action">
        <ScarcityPill />
        <button class="btn btn--primary final__cta" type="button" @click="$emit('cta')">
          <i class="fa-solid fa-play"></i> {{ LANDING_HERO.cta }}
        </button>
        <small><i class="fa-solid fa-lock"></i><span>{{ LANDING_HERO.note }}</span></small>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.final {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding-block: 104px;
  background: $ink;
  border-top: 1px solid $line;

  @include from('md') {
    padding-block: 152px;
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
        radial-gradient(ellipse 55% 60% at 50% 100%, rgba($accent, 0.22), transparent 70%),
        linear-gradient(180deg, $ink 0%, rgba($ink, 0.86) 30%, rgba($ink, 0.9) 100%);
    }
  }

  &__bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__inner {
    @include container(860px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 22px;
    text-align: center;
  }

  &__logo {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    box-shadow: 0 0 0 1px $line, 0 0 0 10px rgba(255, 255, 255, 0.03);
  }

  h2 {
    @include display(clamp(1.8rem, 4.6vw, 3.2rem));
    margin: 0;
    color: #fff;

    em {
      display: block;
      font-style: normal;
      color: $accent-light;
    }
  }

  p {
    max-width: 620px;
    color: #c5ccd9;
    font-size: 1.12rem;
  }

  &__action {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin-top: 10px;

    small {
      @include label;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: $muted;
      font-size: 0.64rem;
    }
  }

  &__cta {
    min-height: 60px;
    padding-inline: 36px;
    font-size: 0.92rem;
    box-shadow: 0 16px 40px -14px rgba($accent, 0.8);
  }
}
</style>
