<script setup lang="ts">
import { FIT } from '@/config/copy'
import SectionHead from '@/components/ui/SectionHead.vue'
</script>

<template>
  <section class="section fit">
    <div class="fit__inner">
      <SectionHead v-reveal :index="FIT.index" :eyebrow="FIT.eyebrow" :title="FIT.title" :intro="FIT.intro" light />
      <div class="fit__cols">
        <div v-reveal class="fit__col fit__col--yes">
          <h3>{{ FIT.yes.title }}</h3>
          <ul>
            <li v-for="item in FIT.yes.items" :key="item">
              <i class="fa-solid fa-check"></i><span>{{ item }}</span>
            </li>
          </ul>
        </div>
        <div v-reveal="1" class="fit__col fit__col--no">
          <h3>{{ FIT.no.title }}</h3>
          <ul>
            <li v-for="item in FIT.no.items" :key="item">
              <i class="fa-solid fa-xmark"></i><span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.fit {
  background: $paper;

  &__inner {
    @include container;
  }

  &__cols {
    display: flex;
    flex-direction: column;

    @include from('md') {
      flex-direction: row;
    }
  }

  &__col {
    flex: 1 1 50%;
    padding: 40px 28px;

    @include from('md') {
      padding: 56px 48px;
    }

    h3 {
      @include label;
      margin-bottom: 28px;
      font-size: 0.78rem;
    }

    ul {
      display: flex;
      flex-direction: column;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    li {
      display: flex;
      align-items: baseline;
      gap: 16px;
      padding-block: 16px;
      font-family: $font-heading;
      font-stretch: 105%;
      font-weight: 600;
      font-size: clamp(1.05rem, 1.8vw, 1.25rem);
      line-height: 1.35;
    }

    i {
      flex: none;
      font-size: 0.9rem;
    }

    // Panel del "sí": azul marino, peso visual dominante
    &--yes {
      background: $navy;
      color: #fff;

      h3,
      i {
        color: $accent-light;
      }

      li + li {
        border-top: 1px solid $line;
      }
    }

    // Panel del "no": borde fino y texto tachado
    &--no {
      border: 1px solid $paper-line;
      color: $paper-muted;

      h3 {
        color: $paper-muted;
      }

      i {
        color: $accent;
      }

      span {
        text-decoration: line-through;
        text-decoration-color: rgba($accent, 0.6);
        text-decoration-thickness: 1px;
      }

      li + li {
        border-top: 1px solid $paper-line;
      }
    }
  }
}
</style>
