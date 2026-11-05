<script setup lang="ts">
import SiteHeader from '@/components/ui/SiteHeader.vue'
import SiteFooter from '@/components/ui/SiteFooter.vue'
import MessagePanel from '@/components/ui/MessagePanel.vue'
import { BRAND } from '@/config/funnel'
import { useContactStore } from '@/stores/contact'

const { contact } = useContactStore()
</script>

<template>
  <div>
    <SiteHeader />
    <main>
      <MessagePanel
        icon="fa-circle-check"
        tone="success"
        :title="
          contact.nombre
            ? `Listo, ${contact.nombre}. Tu reunión está agendada`
            : 'Tu reunión está agendada'
        "
      >
        <p>Te enviamos la confirmación a tu correo y por WhatsApp.</p>
        <p>
          Para aprovechar la reunión, ten a mano qué transportas o proteges, con qué frecuencia y
          qué riesgos has tenido hasta hoy. Con eso te diremos con claridad si tu operación encaja y
          qué contrato necesitarías.
        </p>
        <template #actions>
          <a
            class="btn btn--ghost"
            :href="BRAND.instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fa-brands fa-instagram"></i> Conócenos en Instagram
          </a>
        </template>
      </MessagePanel>
    </main>
    <SiteFooter />
  </div>
</template>
