<script setup lang="ts">
import { ref } from 'vue'
import { IMAGES, STORY } from '@/config/copy'
import SectionHead from '@/components/ui/SectionHead.vue'
import { gsap, parallax, useMotion } from '@/composables/useMotion'

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }) => {
  if (reduce) return
  parallax(root.value!.querySelector('.story__bg')!, 16)
  // La línea que une los hitos se dibuja y luego aparecen los hitos
  gsap
    .timeline({ scrollTrigger: { trigger: '.story__track', start: 'top 80%', once: true } })
    .from('.story__rail', { scaleX: 0, duration: 1.2, ease: 'power3.inOut' })
    .from('.milestone', { y: 24, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'expo.out' }, '-=0.6')
})
</script>

<template>
  <section ref="root" class="story">
    <div class="story__media">
      <img class="story__bg" :src="IMAGES.story" alt="" loading="lazy" decoding="async" />
    </div>
    <div class="story__inner">
      <SectionHead v-reveal :index="STORY.index" :eyebrow="STORY.eyebrow" :title="STORY.title" />
      <div class="story__track">
        <span class="story__rail"></span>
        <ol class="story__list">
          <li v-for="t in STORY.timeline" :key="t.title" class="milestone">
            <span class="milestone__dot"></span>
            <span class="milestone__tag">{{ t.tag }}</span>
            <h3>{{ t.title }}</h3>
            <p>{{ t.text }}</p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.story {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding-block: 120px 96px;
  background: $ink;

  @include from('md') {
    padding-block: 200px 120px;
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
      background: linear-gradient(180deg, rgba($ink, 0.75) 0%, rgba($ink, 0.6) 40%, rgba($ink, 0.97) 85%);
    }
  }

  &__bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__inner {
    @include container;
  }

  &__track {
    position: relative;
  }

  // Riel horizontal en desktop, vertical en móvil
  &__rail {
    position: absolute;
    top: 6px;
    left: 5px;
    bottom: 0;
    width: 1px;
    background: rgba(255, 255, 255, 0.35);
    transform-origin: top left;

    @include from('md') {
      right: 0;
      bottom: auto;
      width: auto;
      height: 1px;
      transform-origin: left;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin: 0;
    padding: 0;
    list-style: none;

    @include from('md') {
      flex-direction: row;
      gap: 48px;
    }
  }
}

.milestone {
  position: relative;
  flex: 1;
  padding-left: 32px;

  @include from('md') {
    padding: 36px 0 0;
  }

  &__dot {
    position: absolute;
    top: 0;
    left: 0;
    width: 11px;
    height: 11px;
    background: $accent;
    box-shadow: 0 0 0 5px rgba($accent, 0.3);
  }

  &__tag {
    @include label;
    color: $accent-light;
  }

  h3 {
    @include heading(1.45rem);
    margin: 10px 0 8px;
    color: #fff;
  }

  p {
    max-width: 360px;
    color: #c5ccd9;
  }
}
</style>
