<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

// Barra fija en móvil: aparece cuando los elementos de hideWhen salen de pantalla
// (el hero) y se esconde cuando vuelven a verse (el CTA final, el footer).
const props = defineProps<{ label: string; hideWhen: string[]; title?: string; note?: string }>()
defineEmits<{ cta: [] }>()

const visible = ref(false)
const inView = new Set<Element>()
let observer: IntersectionObserver | undefined

onMounted(() => {
  const targets = props.hideWhen
    .map((s) => document.querySelector(s))
    .filter((el): el is Element => !!el)
  if (!targets.length) return

  observer = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) inView.add(e.target)
      else inView.delete(e.target)
    }
    visible.value = inView.size === 0
  })
  targets.forEach((el) => observer!.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div class="sticky" :class="{ 'sticky--visible': visible }" :aria-hidden="!visible">
    <p v-if="title" class="sticky__text">
      <strong>{{ title }}</strong>
      <span v-if="note">{{ note }}</span>
    </p>
    <button
      class="btn btn--primary"
      :class="{ 'btn--block': !title }"
      type="button"
      :tabindex="visible ? 0 : -1"
      @click="$emit('cta')"
    >
      {{ label }} <i class="fa-solid fa-arrow-right"></i>
    </button>
  </div>
</template>

<style scoped lang="scss">
.sticky {
  position: fixed;
  inset: auto 0 0;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 16px calc(10px + env(safe-area-inset-bottom));
  background: rgba($ink, 0.92);
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba($accent, 0.45);
  transform: translateY(100%);
  transition: transform 250ms ease;
  pointer-events: none;

  &--visible {
    transform: none;
    transition: transform 400ms $ease-out;
    pointer-events: auto;
  }

  @include from('md') {
    display: none;
  }

  &__text {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 2px;
    margin: 0;
    min-width: 0;

    strong {
      font-family: $font-heading;
      font-stretch: 110%;
      font-size: 0.86rem;
      color: #fff;
    }

    span {
      @include label;
      color: $accent-light;
      font-size: 0.6rem;
    }
  }

  .btn {
    flex: none;
    min-height: 46px;
    padding: 12px 16px;
    font-size: 0.72rem;
  }
}
</style>
