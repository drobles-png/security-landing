import { GHL } from '@/config/funnel'
import { getAttribution } from './attribution'

export function eventId(prefix = 'evt'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2)}`
}

// Nunca bloquea la UX: sin URL o con error, simplemente no envía
export async function postWebhook(url: string, payload: Record<string, unknown>) {
  if (!url) {
    console.info('[Browinn] webhook sin configurar', payload)
    return
  }
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...getAttribution(), ...payload }),
    })
  } catch {
    /* silencioso */
  }
}

// La nota del contacto viaja con tres nombres (notas, nota, notes): el workflow de GHL
// puede mapear cualquiera y la nota llega igual al contacto.
export function noteFields(lines: string[]) {
  const { utm_source, utm_campaign, utm_content, fbclid } = getAttribution()
  const origen = [utm_source, utm_campaign, utm_content].filter(Boolean).join(' / ')
  const text = [
    ...lines,
    ...(origen ? [`📣 Origen: ${origen}`] : []),
    `🔗 fbclid: ${fbclid || 'sin clic de anuncio (tráfico directo u orgánico)'}`,
  ].join('\n')
  return { notas: text, nota: text, notes: text }
}

export function trackStage(etapa: string, data: Record<string, unknown>) {
  return postWebhook(GHL.contactWebhook, { etapa, event_id: eventId('stage'), ...data })
}

// Mismo event_id en Pixel y CAPI para que Meta deduplique
export function trackMeta(
  name: string,
  id: string,
  user: { email?: string; phone?: string } = {},
  custom: Record<string, unknown> = {},
) {
  window.fbq?.('track', name, custom, { eventID: id })

  const { fbc, fbp } = getAttribution()
  fetch('/api/capi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event_name: name,
      event_id: id,
      event_source_url: window.location.href,
      user_data: { ...user, fbc, fbp },
      custom_data: custom,
    }),
  }).catch(() => {})
}
