<script setup lang="ts">
import { ref } from 'vue'
import { START } from '@/config/copy'
import SectionHead from '@/components/ui/SectionHead.vue'
import { gsap, useMotion } from '@/composables/useMotion'

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }) => {
  if (reduce) return
  gsap
    .timeline({ scrollTrigger: { trigger: '.start__steps', start: 'top 80%', once: true } })
    .from('.start__steps li', { y: 30, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'expo.out' })
    .from('.start__rule', { scaleX: 0, duration: 1, stagger: 0.12, ease: 'power3.inOut' }, 0.2)
})
</script>

<template>
  <section ref="root" class="section start">
    <div class="start__inner">
      <SectionHead v-reveal :index="START.index" :eyebrow="START.eyebrow" :title="START.title" />
      <ol class="start__steps">
        <li v-for="(s, i) in START.steps" :key="s.title">
          <span class="start__rule"></span>
          <span class="start__num">0{{ i + 1 }}</span>
          <h3>{{ s.title }}</h3>
          <p>{{ s.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped lang="scss">
.start {
  background: $surface;

  &__inner {
    @include container;
  }

  &__steps {
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin: 0;
    padding: 0;
    list-style: none;

    @include from('md') {
      flex-direction: row;
      gap: 32px;
    }

    li {
      position: relative;
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: 12px;
      padding-top: 28px;
    }

    h3 {
      @include heading(clamp(1.3rem, 2vw, 1.6rem));
      color: #fff;
    }

    p {
      max-width: 320px;
      color: $muted;
      font-size: 1.05rem;
    }
  }

  // Regla superior: el primer tramo en rojo, el resto en gris
  &__rule {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: $line;
    transform-origin: left;

    li:first-child & {
      background: $accent;
    }
  }

  &__num {
    @include label;
    color: $accent-light;
  }
}
</style>
