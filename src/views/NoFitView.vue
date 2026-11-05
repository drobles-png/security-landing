<script setup lang="ts">
import SiteHeader from '@/components/ui/SiteHeader.vue'
import SiteFooter from '@/components/ui/SiteFooter.vue'
import MessagePanel from '@/components/ui/MessagePanel.vue'
import { BRAND } from '@/config/funnel'
</script>

<template>
  <div>
    <SiteHeader />
    <main>
      <MessagePanel icon="fa-handshake" title="Gracias por tu honestidad">
        <p>
          Como te contamos en el video, trabajamos solo con contratos de al menos 6 meses para
          embarcaciones, transporte de carga, hoteles y empresas. Por lo que nos contaste, hoy tu
          necesidad no encaja con ese modelo.
        </p>
        <p>Si tu operación cambia y necesitas protección sostenida, aquí vamos a estar.</p>
        <template #actions>
          <a
            class="btn btn--primary"
            :href="BRAND.instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fa-brands fa-instagram"></i> Síguenos en Instagram
          </a>
          <RouterLink to="/" class="btn btn--ghost">
            <i class="fa-solid fa-arrow-left"></i> Volver al inicio
          </RouterLink>
        </template>
      </MessagePanel>
    </main>
    <SiteFooter />
  </div>
</template>
