<script setup lang="ts">
import SiteHeader from '@/components/ui/SiteHeader.vue'
import SiteFooter from '@/components/ui/SiteFooter.vue'
import { BRAND } from '@/config/funnel'
</script>

<template>
  <div>
    <SiteHeader />
    <main class="legal">
      <h1>Política de privacidad</h1>
      <p>
        {{ BRAND.name }} recopila en este sitio tu nombre, apellido, empresa, correo, número de
        WhatsApp y las respuestas que nos das sobre tu operación. Los usamos solo para evaluar si
        nuestro servicio encaja con tu necesidad y para contactarte sobre una reunión comercial.
      </p>
      <h2>Con quién los compartimos</h2>
      <p>
        No vendemos tus datos. Los guardamos en nuestro CRM y usamos herramientas de medición de
        publicidad (como Meta) para saber qué anuncios funcionan. Esas herramientas reciben tu
        correo y teléfono cifrados.
      </p>
      <h2>Tus derechos</h2>
      <p>
        Conforme a la Ley Orgánica de Protección de Datos Personales del Ecuador, puedes pedir
        acceder, corregir o eliminar tus datos, o dejar de recibir mensajes, escribiéndonos por
        nuestros canales oficiales.
      </p>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped lang="scss">
.legal {
  @include container(760px);
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-block: 56px 80px;
  color: $muted;

  h1 {
    @include heading(clamp(2rem, 6vw, 2.8rem));
    color: $text;
  }

  h2 {
    @include heading(1.4rem);
    color: $text;
    margin-top: 16px;
  }
}
</style>
