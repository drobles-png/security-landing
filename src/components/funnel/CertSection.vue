<script setup lang="ts">
import { ref } from 'vue'
import { CERT } from '@/config/copy'
import SectionHead from '@/components/ui/SectionHead.vue'
import { gsap, useMotion } from '@/composables/useMotion'

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ reduce }) => {
  if (reduce) return
  // El certificado llega inclinado y se endereza mientras se hace scroll
  gsap.fromTo(
    '.cert__doc',
    { rotate: -7, y: 60 },
    {
      rotate: -2,
      y: 0,
      ease: 'none',
      scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'center center', scrub: true },
    },
  )
  // Las filas de la ficha se dibujan una por una
  gsap.from('.cert__row', {
    clipPath: 'inset(0 100% 0 0)',
    duration: 0.9,
    stagger: 0.08,
    ease: 'power3.inOut',
    scrollTrigger: { trigger: '.cert__specs', start: 'top 80%', once: true },
  })
})
</script>

<template>
  <section id="certificacion" ref="root" class="section cert">
    <div class="cert__inner">
      <div class="cert__visual">
        <div class="cert__stage">
          <span class="cert__stamp">Certificado<br />vigente</span>
          <img class="cert__doc" :src="CERT.image" alt="Certificado World BASC Organization de Browinn Security" width="497" height="676" loading="lazy" />
        </div>
      </div>
      <div class="cert__copy">
        <SectionHead
          v-reveal
          :index="CERT.index"
          :eyebrow="CERT.eyebrow"
          :title="CERT.title"
          :intro="CERT.intro"
          light
        />
        <dl class="cert__specs">
          <div v-for="s in CERT.specs" :key="s.k" class="cert__row">
            <dt>{{ s.k }}</dt>
            <dd>{{ s.v }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cert {
  background: $paper;
  color: $paper-text;
  overflow: hidden;

  &__inner {
    @include container;
    display: flex;
    flex-direction: column-reverse;
    gap: 56px;

    @include from('lg') {
      flex-direction: row;
      align-items: center;
      gap: 96px;
    }
  }

  &__visual {
    flex: 1 1 44%;
  }

  // Escenario azul marino con retícula fina, el certificado encima
  &__stage {
    position: relative;
    display: grid;
    place-items: center;
    aspect-ratio: 4 / 4.4;
    padding: 12%;
    background:
      linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px) 0 0 / 40px 40px,
      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px) 0 0 / 40px 40px,
      $navy;
  }

  &__doc {
    width: 78%;
    box-shadow:
      0 2px 0 rgba(0, 0, 0, 0.1),
      0 40px 80px -20px rgba(0, 0, 0, 0.7);
    transform: rotate(-2deg);
  }

  // Sello circular rojo sobre la esquina
  &__stamp {
    @include label;
    position: absolute;
    top: 7%;
    right: 7%;
    z-index: 1;
    display: grid;
    place-items: center;
    width: 112px;
    height: 112px;
    border-radius: 50%;
    background: $accent;
    color: #fff;
    font-size: 0.64rem;
    line-height: 1.5;
    text-align: center;
    box-shadow: 0 0 0 6px rgba($accent, 0.25);
    transform: rotate(12deg);
  }

  &__copy {
    flex: 1 1 56%;
  }

  &__specs {
    margin: 0;
    border-top: 1px solid $paper-line;
  }

  &__row {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-block: 18px;
    border-bottom: 1px solid $paper-line;

    @include from('sm') {
      flex-direction: row;
      gap: 24px;
    }

    dt {
      @include label;
      padding-top: 3px;

      @include from('sm') {
        flex: 0 0 140px;
      }

      color: $accent;
    }

    dd {
      margin: 0;
      font-family: $font-heading;
      font-stretch: 105%;
      font-weight: 600;
      font-size: 1.08rem;
      color: $paper-text;
    }
  }
}
</style>
