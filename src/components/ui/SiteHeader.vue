<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import BrandLogo from './BrandLogo.vue'

// overlay: flota transparente sobre el hero y se vuelve sólido al bajar
const props = defineProps<{
  step?: string
  ctaLabel?: string
  overlay?: boolean
  nav?: { href: string; label: string }[]
}>()
defineEmits<{ cta: [] }>()

const solid = ref(!props.overlay)
const onScroll = () => (solid.value = !props.overlay || window.scrollY > 40)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="header" :class="{ 'header--overlay': overlay, 'header--solid': solid }">
    <div class="header__inner">
      <BrandLogo />
      <nav v-if="nav" class="header__nav" aria-label="Secciones">
        <a v-for="n in nav" :key="n.href" :href="n.href">{{ n.label }}</a>
      </nav>
      <span v-if="step" class="header__step">{{ step }}</span>
      <!-- En móvil el CTA vive en la barra inferior; aquí solo desde tablet -->
      <button
        v-else-if="ctaLabel"
        class="btn btn--primary header__cta"
        type="button"
        @click="$emit('cta')"
      >
        {{ ctaLabel }}
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 40;
  border-bottom: 1px solid transparent;
  transition:
    background-color 300ms ease,
    border-color 300ms ease;

  &--overlay {
    position: fixed;
    inset: 0 0 auto;
  }

  &--solid {
    background: rgba($ink, 0.86);
    backdrop-filter: blur(14px) saturate(1.3);
    border-bottom-color: $line;
  }

  &__inner {
    @include container;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    min-height: 72px;
  }

  &__nav {
    display: none;
    gap: 32px;
    margin-left: auto;

    @include from('lg') {
      display: flex;
    }

    a {
      @include label;
      position: relative;
      color: $muted;
      text-decoration: none;
      transition: color 200ms ease;

      // Subrayado que crece desde la izquierda
      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        height: 1px;
        background: $accent-light;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 300ms $ease-out;
      }

      @include hover {
        color: #fff;

        &::after {
          transform: scaleX(1);
        }
      }
    }
  }

  &__step {
    @include label;
    color: $muted;
    white-space: nowrap;
  }

  &__cta {
    display: none;
    min-height: 42px;
    padding: 10px 18px;
    font-size: 0.74rem;

    @include from('md') {
      display: inline-flex;
    }
  }
}
</style>
