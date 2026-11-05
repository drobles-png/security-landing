<script setup lang="ts">
import { ref } from 'vue'
import { HERO, HOOK, IMAGES, LANDING_HERO } from '@/config/copy'
import ScarcityPill from './ScarcityPill.vue'
import { EASE_OUT, gsap, useMotion } from '@/composables/useMotion'

defineEmits<{ cta: [] }>()

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }) => {
  if (reduce) return
  gsap
    .timeline({ defaults: { ease: EASE_OUT } })
    .from('.hero__eyebrow, .hero__title, .hero__checks', { y: 24, opacity: 0, duration: 1, stagger: 0.1 })
    .from('.hero__video', { y: 40, opacity: 0, scale: 0.97, duration: 1.2 }, '-=0.7')
    .from('.hero__action > *', { y: 16, opacity: 0, duration: 0.8, stagger: 0.08 }, '-=0.8')
})
</script>

<template>
  <section ref="root" class="hero">
    <div class="hero__media">
      <img class="hero__bg" :src="IMAGES.hero" alt="" width="1920" height="1080" fetchpriority="high" />
    </div>
    <div class="hero__inner">
      <span class="hero__eyebrow">{{ LANDING_HERO.eyebrow }}</span>
      <h1 class="hero__title">
        {{ LANDING_HERO.lead }} <em>{{ LANDING_HERO.accent }}</em> {{ LANDING_HERO.tail }}
      </h1>
      <ul class="hero__checks">
        <li v-for="c in LANDING_HERO.checks" :key="c"><i class="fa-solid fa-check"></i> {{ c }}</li>
      </ul>

      <button class="hero__video" type="button" :aria-label="LANDING_HERO.cta" @click="$emit('cta')">
        <img class="hero__poster" :src="IMAGES.poster" alt="" width="1280" height="720" />
        <span class="hero__play"><i class="fa-solid fa-play"></i></span>
        <span class="hero__video-meta">
          <span>{{ HOOK.title }}</span>
          <b>{{ HERO.videoDuration }}</b>
        </span>
      </button>

      <div class="hero__action">
        <ScarcityPill />
        <button class="btn btn--primary hero__cta" type="button" @click="$emit('cta')">
          <i class="fa-solid fa-play"></i> {{ LANDING_HERO.cta }}
        </button>
        <small><i class="fa-solid fa-lock"></i><span>{{ LANDING_HERO.note }}</span></small>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding-block: 40px 72px;
  background: $ink;

  @include from('md') {
    padding-block: 56px 104px;
  }

  // La foto del equipo queda de fondo, muy oscurecida: textura real, no protagonista
  &__media {
    position: absolute;
    inset: 0;
    z-index: -1;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse 60% 50% at 50% 0%, rgba($accent, 0.16), transparent 70%),
        linear-gradient(180deg, rgba($ink, 0.82) 0%, rgba($ink, 0.9) 40%, $ink 85%);
    }
  }

  &__bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 40%;
  }

  &__inner {
    @include container(1000px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    text-align: center;
  }

  &__eyebrow {
    @include label;
    color: $accent-light;
  }

  &__title {
    @include heading(clamp(1.6rem, 3.6vw, 2.6rem));
    max-width: 920px;
    margin: 0;
    font-weight: 800;
    line-height: 1.12;
    color: #fff;

    em {
      font-style: normal;
      color: $accent-light;
    }
  }

  &__checks {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px 26px;
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      @include label;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: #dfe4ec;
      font-size: 0.68rem;
    }

    i {
      color: $accent-light;
    }
  }

  // Video grande al centro, con esquinas tácticas
  &__video {
    position: relative;
    display: grid;
    place-items: center;
    width: 100%;
    max-width: 820px;
    aspect-ratio: 16 / 9;
    margin-top: 8px;
    padding: 0;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: #000;
    color: #fff;
    cursor: pointer;
    box-shadow: 0 40px 100px -30px rgba(0, 0, 0, 0.9), 0 0 0 10px rgba(255, 255, 255, 0.03);
    -webkit-tap-highlight-color: transparent;
    transition: transform 160ms $ease-out;

    &::after {
      content: '';
      position: absolute;
      inset: 14px;
      @include brackets(rgba(255, 255, 255, 0.7), 20px);
      pointer-events: none;
    }

    &:active {
      transform: scale(0.99);
    }

    @include hover {
      .hero__poster {
        transform: scale(1.03);
      }

      .hero__play {
        transform: scale(1.08);
      }
    }
  }

  &__poster {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 900ms $ease-out;
  }

  &__play {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    width: clamp(64px, 12vw, 92px);
    height: clamp(64px, 12vw, 92px);
    border-radius: 50%;
    background: $accent;
    font-size: clamp(1.2rem, 2.6vw, 1.6rem);
    padding-left: 4px;
    box-shadow: 0 0 0 12px rgba($accent, 0.22);
    transition: transform 250ms $ease-out;
  }

  &__video-meta {
    position: absolute;
    inset: auto 0 0;
    z-index: 1;
    display: none;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    padding: 40px 28px 22px;
    background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.85));
    font-size: 0.95rem;
    text-align: left;

    b {
      @include label;
      flex: none;
    }

    @include from('md') {
      display: flex;
    }
  }

  &__action {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin-top: 32px;

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
