<script setup lang="ts">
import { BRAND } from '@/config/funnel'
import { CERT, CONTACT, LEGAL, TAGLINE, VERTICALS } from '@/config/copy'
import BrandLogo from './BrandLogo.vue'

// full: footer completo con columnas; legal: footer corto de funnel con aviso de Meta;
// sin ninguno, solo la línea legal (resto de páginas)
defineProps<{ full?: boolean; legal?: boolean }>()

const year = new Date().getFullYear()
const cert = CERT.specs.find((s) => s.k === 'Certificado')?.v
</script>

<template>
  <footer class="footer">
    <div v-if="full" class="footer__top">
      <div class="footer__brand">
        <BrandLogo />
        <p>{{ TAGLINE }}</p>
        <span class="footer__basc"><i class="fa-solid fa-certificate"></i> World BASC · {{ cert }}</span>
      </div>
      <div class="footer__col">
        <h4>Servicios</h4>
        <ul>
          <li v-for="v in VERTICALS" :key="v.code">{{ v.title }}</li>
        </ul>
      </div>
      <div class="footer__col">
        <h4>Contacto</h4>
        <ul>
          <li>{{ CONTACT.address }}</li>
          <li><a :href="`tel:${CONTACT.phone.replace(/\s/g, '')}`">{{ CONTACT.phone }}</a></li>
          <li><a :href="`mailto:${CONTACT.email}`">{{ CONTACT.email }}</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4>Síguenos</h4>
        <ul>
          <li>
            <a :href="BRAND.instagram" target="_blank" rel="noopener noreferrer">
              <i class="fa-brands fa-instagram"></i> Instagram
            </a>
          </li>
          <li>
            <a :href="BRAND.facebook" target="_blank" rel="noopener noreferrer">
              <i class="fa-brands fa-facebook"></i> Facebook
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="legal" class="footer__legal">
      <BrandLogo />
      <span class="footer__basc"><i class="fa-solid fa-certificate"></i> World BASC · {{ cert }}</span>
      <p>{{ LEGAL.disclaimer }}</p>
    </div>
    <div class="footer__bottom">
      <p>© {{ year }} {{ CONTACT.company }} · {{ BRAND.city }}</p>
      <RouterLink to="/politicas-privacidad">Política de privacidad</RouterLink>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: #050a16;
  color: $muted;
  font-size: 0.95rem;

  &__top {
    @include container;
    display: flex;
    flex-wrap: wrap;
    gap: 40px 56px;
    padding-block: 72px 56px;

    > * {
      flex: 1 1 200px;
    }
  }

  &__brand {
    display: flex;
    flex: 1 1 300px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    p {
      max-width: 280px;
      color: #c5ccd9;
    }
  }

  &__basc {
    @include label;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border: 1px solid $line;
    color: #fff;
    font-size: 0.62rem;

    i {
      color: $accent-light;
    }
  }

  &__col {
    h4 {
      @include label;
      margin: 0 0 18px;
      color: #fff;
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color 200ms ease;

    @include hover {
      color: #fff;
    }
  }

  // Footer de funnel: centrado, con aviso legal
  &__legal {
    @include container(760px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
    padding-block: 56px 32px;
    text-align: center;

    p {
      font-size: 0.8rem;
      line-height: 1.6;
    }
  }

  &__bottom {
    @include container;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 12px;
    padding-block: 24px;
    border-top: 1px solid $line;
    font-size: 0.85rem;
  }
}
</style>
