<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SiteFooter from '@/components/ui/SiteFooter.vue'
import StickyCta from '@/components/ui/StickyCta.vue'
import UrgencyBar from '@/components/funnel/UrgencyBar.vue'
import HeroSection from '@/components/funnel/HeroSection.vue'
import ProofSection from '@/components/funnel/ProofSection.vue'
import AuthoritySection from '@/components/funnel/AuthoritySection.vue'
import FinalCtaSection from '@/components/funnel/FinalCtaSection.vue'
import RegistrationModal from '@/components/lead/RegistrationModal.vue'
import { SCARCITY } from '@/config/copy'
import { IS_DEV, STORAGE } from '@/config/funnel'
import { useRegistrationModal } from '@/composables/useModal'
import { useContactStore } from '@/stores/contact'
import { captureAttribution } from '@/utils/attribution'
import { hoursSince } from '@/utils/storage'

const router = useRouter()
const store = useContactStore()
const registration = useRegistrationModal()

// Quien ya se registró va directo al video, sin volver a llenar el formulario
function openVideo() {
  if (store.hasContact) router.push('/ver-video')
  else registration.open()
}

function onRegistered() {
  registration.close()
  router.push('/ver-video')
}

onMounted(() => {
  captureAttribution()
  if (!IS_DEV && hoursSince(STORAGE.disqualifiedAt) < 24) router.replace('/sin-espacio')
})
</script>

<template>
  <div>
    <UrgencyBar />
    <main>
      <HeroSection @cta="openVideo" />
      <ProofSection @cta="openVideo" />
      <AuthoritySection />
      <FinalCtaSection @cta="openVideo" />
    </main>
    <SiteFooter legal />
    <StickyCta
      label="Ver el video"
      title="Reunión comercial sin costo"
      :note="`${SCARCITY.slots} cupos este mes`"
      :hide-when="['.hero', '.final', '.footer']"
      @cta="openVideo"
    />
    <RegistrationModal
      :open="registration.isOpen.value"
      @close="registration.close"
      @done="onRegistered"
    />
  </div>
</template>
