<script setup lang="ts">
import { ref } from 'vue'
import { AUTHORITY } from '@/config/copy'
import { gsap, parallax, useMotion } from '@/composables/useMotion'

// "**texto**" en el copy marca lo que va en negrita
const chunks = (s: string) => s.split('**').map((text, i) => ({ text, bold: i % 2 === 1 }))

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }) => {
  if (reduce) return
  parallax(root.value!.querySelector('.auth__photo img')!, 10)
  gsap.from('.auth__photo', {
    clipPath: 'inset(0 0 100% 0)',
    duration: 1.2,
    ease: 'power3.inOut',
    scrollTrigger: { trigger: '.auth__photo', start: 'top 85%', once: true },
  })
})
</script>

<template>
  <section ref="root" class="auth">
    <div class="auth__inner">
      <div class="auth__visual">
        <figure class="auth__photo">
          <img :src="AUTHORITY.image" alt="Personal de Browinn Security recibiendo su certificación" width="1200" height="900" loading="lazy" />
        </figure>
        <span class="auth__badge"><i class="fa-solid fa-circle-check"></i> {{ AUTHORITY.badge }}</span>
      </div>
      <div class="auth__copy">
        <span v-reveal class="auth__eyebrow">{{ AUTHORITY.eyebrow }}</span>
        <h2 v-reveal="1">{{ AUTHORITY.name }}</h2>
        <span v-reveal="1" class="auth__role">{{ AUTHORITY.role }}</span>
        <p v-reveal="2">{{ AUTHORITY.bio }}</p>
        <ul class="auth__points">
          <li v-for="(pt, i) in AUTHORITY.points" :key="i" v-reveal="i + 3">
            <i class="fa-solid fa-check"></i>
            <span
              ><template v-for="(c, k) in chunks(pt)" :key="k"
                ><strong v-if="c.bold">{{ c.text }}</strong
                ><template v-else>{{ c.text }}</template></template
              ></span
            >
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.auth {
  padding-block: 88px;
  background: $ink;

  @include from('md') {
    padding-block: 128px;
  }

  &__inner {
    @include container(1080px);
    display: flex;
    flex-direction: column;
    gap: 56px;

    @include from('md') {
      flex-direction: row;
      align-items: center;
      gap: 72px;
    }
  }

  &__visual {
    position: relative;
    flex: 0 0 42%;
  }

  &__photo {
    position: relative;
    margin: 0;
    aspect-ratio: 4 / 5;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 14px;
      @include brackets(rgba(255, 255, 255, 0.8), 20px);
    }
  }

  // Sello sobre el borde inferior de la foto, como el "Fundador verificado" del ejemplo
  &__badge {
    @include label;
    position: absolute;
    left: 50%;
    bottom: -16px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background: $accent;
    color: #fff;
    font-size: 0.64rem;
    white-space: nowrap;
    transform: translateX(-50%);
    box-shadow: 0 12px 30px -10px rgba($accent, 0.8);
  }

  &__copy {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 14px;
  }

  &__eyebrow {
    @include eyebrow;
  }

  h2 {
    @include display(clamp(2.2rem, 5vw, 3.4rem));
    margin: 0;
    color: #fff;
  }

  &__role {
    @include label;
    color: $accent-light;
  }

  p {
    color: #c5ccd9;
    font-size: 1.08rem;
    line-height: 1.6;
  }

  &__points {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin: 10px 0 0;
    padding: 0;
    list-style: none;

    li {
      display: flex;
      gap: 14px;
      color: #c5ccd9;
      line-height: 1.5;
    }

    i {
      flex: none;
      margin-top: 5px;
      color: $accent-light;
      font-size: 0.85rem;
    }

    li + li {
      padding-top: 16px;
      border-top: 1px solid $line;
    }

    strong {
      color: #fff;
      font-weight: 700;
    }
  }
}
</style>
