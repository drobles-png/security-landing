<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SiteHeader from '@/components/ui/SiteHeader.vue'
import SiteFooter from '@/components/ui/SiteFooter.vue'
import VslPlayer from '@/components/video/VslPlayer.vue'
import AuthoritySection from '@/components/funnel/AuthoritySection.vue'
import RegistrationModal from '@/components/lead/RegistrationModal.vue'
import QualifyModal from '@/components/qualify/QualifyModal.vue'
import { VIDEO_PAGE } from '@/config/copy'
import { IS_DEV, VIDEO } from '@/config/funnel'
import { useCountdown } from '@/composables/useCountdown'
import { useContactStore } from '@/stores/contact'
import { captureAttribution } from '@/utils/attribution'
import { eventId, trackMeta } from '@/utils/tracking'

const store = useContactStore()
const countdown = useCountdown(IS_DEV ? 3 : VIDEO.unlockSeconds)
const gateOpen = ref(false)
const qualifyOpen = ref(false)

function startWatching() {
  gateOpen.value = false
  const { email, telefono } = store.contact
  trackMeta('ViewContent', eventId('view'), { email, phone: telefono }, { content_name: 'vsl' })
  countdown.start()
}

onMounted(() => {
  captureAttribution()
  // Sin registro no hay video: quien entra directo por link debe dejar sus datos
  if (!store.hasContact && !IS_DEV) gateOpen.value = true
  else startWatching()
})
</script>

<template>
  <div>
    <SiteHeader step="Paso 1 de 2" />
    <main>
      <section class="watch">
        <div class="watch__inner">
          <span class="watch__eyebrow">{{ VIDEO_PAGE.eyebrow }}</span>
          <h1 class="watch__title">{{ VIDEO_PAGE.title }}</h1>
          <VslPlayer />

          <div class="watch__cta">
            <button
              class="btn btn--primary"
              type="button"
              :disabled="!countdown.done.value"
              @click="qualifyOpen = true"
            >
              <i
                class="fa-solid"
                :class="countdown.done.value ? 'fa-calendar-check' : 'fa-lock'"
              ></i>
              {{ VIDEO_PAGE.cta }}
            </button>
            <small v-if="!countdown.done.value">
              {{ VIDEO_PAGE.locked }} <strong>{{ countdown.label.value }}</strong>
            </small>
            <small v-else class="watch__ready">
              <i class="fa-solid fa-circle-check"></i> {{ VIDEO_PAGE.unlocked }}
            </small>
          </div>
        </div>
      </section>

      <AuthoritySection />
    </main>
    <SiteFooter legal />

    <RegistrationModal :open="gateOpen" :closable="false" @done="startWatching" />
    <QualifyModal :open="qualifyOpen" @close="qualifyOpen = false" />
  </div>
</template>

<style scoped lang="scss">
.watch {
  padding-block: 40px 72px;
  background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba($accent, 0.12), transparent 70%), $ink;

  &__inner {
    @include container(960px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    text-align: center;
  }

  &__eyebrow {
    @include eyebrow;
  }

  &__title {
    @include display(clamp(1.6rem, 4.4vw, 2.8rem));
    max-width: 860px;
    margin-bottom: 8px;
    color: #fff;
  }

  &__cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 12px;

    small {
      @include label;
      color: $muted;
      font-size: 0.66rem;
    }

    .btn {
      min-height: 60px;
      padding-inline: 36px;
    }

    strong {
      color: $accent-light;
      font-variant-numeric: tabular-nums;
    }
  }

  &__ready {
    color: $success !important;
  }
}
</style>
