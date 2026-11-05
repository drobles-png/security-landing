<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import SiteHeader from '@/components/ui/SiteHeader.vue'
import SiteFooter from '@/components/ui/SiteFooter.vue'
import MessagePanel from '@/components/ui/MessagePanel.vue'
import { BRAND, GHL, IS_DEV, STORAGE } from '@/config/funnel'
import { useContactStore } from '@/stores/contact'
import { getAttribution } from '@/utils/attribution'
import { readJson } from '@/utils/storage'
import { eventId, noteFields, trackMeta, trackStage } from '@/utils/tracking'

const router = useRouter()
const store = useContactStore()
const iframe = ref<HTMLIFrameElement | null>(null)
let handled = false

const frameId = `${GHL.calendarUrl.split('/').pop()}_booking`

const qualified = () => readJson(STORAGE.qualification, { califica: false }).califica

// Pre-llena el calendario con el contacto y la atribución para no perderla en GHL
const calendarSrc = computed(() => {
  if (!GHL.calendarUrl) return ''
  const { nombre, apellido, email, telefono } = store.contact
  // GHL prellena nombre con first_name/last_name; firstName/lastName se mantienen por compatibilidad
  const params = new URLSearchParams({
    first_name: nombre,
    last_name: apellido,
    firstName: nombre,
    lastName: apellido,
    email,
    phone: telefono,
  })
  const attribution = getAttribution()
  for (const [k, v] of Object.entries(attribution))
    if (v && k !== 'fbc' && k !== 'fbp') params.set(k, v)
  return `${GHL.calendarUrl}?${params}`
})

const whatsappHref = computed(() => {
  if (!BRAND.whatsapp) return ''
  const text = `Hola, soy ${store.contact.nombre} de ${store.contact.empresa}. Vi el video y quiero agendar una reunión comercial.`
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(text)}`
})

// GHL ha cambiado el nombre del aviso de cita agendada: aceptamos el clásico y variantes
function isBookingComplete(data: unknown): boolean {
  const name = Array.isArray(data) ? String(data[0]) : String((data as { type?: string })?.type ?? '')
  return /booking-complete|bookingcomplete|appointment[-_.]?(booked|created|scheduled)/i.test(name)
}

function onMessage(e: MessageEvent) {
  if (!e.data || e.source !== iframe.value?.contentWindow) return

  if (isBookingComplete(e.data) && !handled) {
    handled = true
    const id = eventId('schedule')
    const { email, telefono } = store.contact
    const { nombre, apellido, empresa } = store.contact
    trackStage('reunion_agendada', {
      ...store.contact,
      ...noteFields([
        '📅 REUNIÓN AGENDADA — Browinn Security',
        '━━━━━━━━━━━━━━━━━━━━━━━━',
        `👤 ${nombre} ${apellido}`,
        `🏢 ${empresa}`,
        'Agendó su reunión comercial desde el calendario de la landing.',
        `🕐 ${new Date().toLocaleString('es-EC', { timeZone: 'America/Guayaquil' })}`,
      ]),
      etiquetas: ['funnel-browinn', 'step-3-agendado'],
      event_name: 'Schedule',
    })
    trackMeta('Schedule', id, { email, phone: telefono }, { content_name: 'reunion-comercial' })
    localStorage.setItem(STORAGE.bookedAt, String(Date.now()))
    router.push('/cita-confirmada')
  }
}

onMounted(() => {
  if (!IS_DEV && !qualified()) {
    router.replace('/')
    return
  }
  window.addEventListener('message', onMessage)
  loadEmbedScript()
})

// Script oficial de GHL: ajusta la altura del iframe cada vez que cambia el contenido
// (fecha → horas → formulario). Sin él, en móvil las horas y el botón quedaban cortados.
function loadEmbedScript() {
  if (document.querySelector('script[data-ghl-embed]')) return
  const s = document.createElement('script')
  s.src = 'https://link.msgsndr.com/js/form_embed.js'
  s.async = true
  s.dataset.ghlEmbed = ''
  document.body.appendChild(s)
}
onUnmounted(() => window.removeEventListener('message', onMessage))
</script>

<template>
  <div>
    <SiteHeader step="Paso 2 de 2" />
    <main>
      <section v-if="calendarSrc" class="booking">
        <div class="booking__inner">
          <span class="booking__eyebrow">Tu operación encaja con lo que hacemos</span>
          <h1 class="booking__title">Elige el día y la hora de tu reunión comercial</h1>
          <iframe
            ref="iframe"
            :id="frameId"
            :src="calendarSrc"
            title="Calendario de reuniones de Browinn Security"
            allow="payment"
          ></iframe>
        </div>
      </section>

      <MessagePanel v-else icon="fa-calendar-check" title="Tu operación encaja con lo que hacemos">
        <p>
          Gracias, {{ store.contact.nombre }}. Un asesor de Browinn Security revisará tu solicitud y
          te contactará para coordinar la reunión comercial.
        </p>
        <template v-if="whatsappHref" #actions>
          <a
            class="btn btn--primary"
            :href="whatsappHref"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fa-brands fa-whatsapp"></i> Escribirnos por WhatsApp
          </a>
        </template>
      </MessagePanel>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped lang="scss">
.booking {
  padding-block: 40px 64px;

  &__inner {
    @include container(900px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    text-align: center;
  }

  &__eyebrow {
    @include eyebrow;
  }

  &__title {
    @include heading(clamp(1.8rem, 5vw, 2.8rem));
    margin-bottom: 12px;
  }

  // Altura de respaldo si el script de GHL no carga: alcanza para horas y formulario
  iframe {
    width: 100%;
    height: 1250px;
    min-height: 760px;
    border: 0;
    overflow: hidden;

    @include from('md') {
      height: 900px;
    }

    border-radius: $radius;
    background: #fff;
  }
}
</style>
