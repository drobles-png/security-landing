// Configuración operativa del funnel. Lo que esté vacío se omite sin romper la UX:
// sin webhook no se envía a GHL, sin Wistia se muestra un placeholder, sin calendario
// se ofrece WhatsApp.

export const BRAND = {
  name: 'Browinn Security',
  domain: '',
  instagram: 'https://www.instagram.com/browinnsecuritycia/',
  facebook: 'https://www.facebook.com/profile.php?id=100063960642992',
  whatsapp: '', // formato internacional sin "+", ej. 593999999999
  city: 'Guayaquil, Ecuador',
}

export const GHL = {
  // Webhook de contacto (registro inicial y eventos de etapa)
  contactWebhook:
    'https://services.leadconnectorhq.com/hooks/VqI1v1yax7N34gLUKRdS/webhook-trigger/NRabbucz7mqDolsNGimO',
  // Webhook de calificación (respuestas del wizard)
  qualifyWebhook:
    'https://services.leadconnectorhq.com/hooks/VqI1v1yax7N34gLUKRdS/webhook-trigger/8w8UErqs0JqUc49xVDlJ',
  // Widget de booking de GHL, ej. https://api.leadconnectorhq.com/widget/booking/XXXX
  calendarUrl: 'https://api.leadconnectorhq.com/widget/booking/XwbHm5Lu5epVMUTJQpWS',
}

export const VIDEO = {
  wistiaId: 'zp6qkgzwmz',
  // Tiempo antes de desbloquear el CTA en /ver-video
  unlockSeconds: 120,
}

export const STORAGE = {
  contact: 'browinn_contact',
  qualification: 'browinn_qualification',
  disqualifiedAt: 'browinn_disq_at',
  bookedAt: 'browinn_booked_at',
  attribution: 'browinn_fb',
}

export const IS_DEV = ['localhost', '127.0.0.1'].includes(window.location.hostname)
