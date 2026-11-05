import { STORAGE } from '@/config/funnel'

// fbclid + UTMs + cookies de Meta para atribuir el lead en GHL y en CAPI
export interface Attribution {
  fbclid: string
  fbc: string
  fbp: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
  utm_id: string
}

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'utm_id',
] as const

const EMPTY: Attribution = {
  fbclid: '',
  fbc: '',
  fbp: '',
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_content: '',
  utm_term: '',
  utm_id: '',
}

// Meta atribuye hasta 90 días después del clic: guardamos el clic ese tiempo, no solo
// la sesión. Quien cierra el navegador de Instagram y vuelve otro día sigue atribuido.
const TTL_MS = 90 * 24 * 60 * 60 * 1000

function getCookie(name: string): string {
  const match = document.cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : ''
}

function setCookie(name: string, value: string) {
  const expires = new Date(Date.now() + TTL_MS).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
}

function readStored(): (Attribution & { savedAt?: number }) | null {
  try {
    const raw = localStorage.getItem(STORAGE.attribution)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (data.savedAt && Date.now() - data.savedAt > TTL_MS) return null
    return data
  } catch {
    return null
  }
}

// Las cookies se leen en cada llamada: _fbp la crea el pixel cuando termina de cargar,
// normalmente después de que la página capturó la atribución.
export function getAttribution(): Attribution {
  const stored = readStored()
  const data: Attribution = { ...EMPTY, ...stored }
  delete (data as { savedAt?: number }).savedAt
  data.fbp = getCookie('_fbp') || data.fbp
  data.fbc = data.fbc || getCookie('_fbc')
  return data
}

export function captureAttribution(): void {
  const params = new URLSearchParams(window.location.search)
  const fbclid = params.get('fbclid') ?? ''
  const hasUtm = UTM_KEYS.some((k) => params.get(k))
  const existing = readStored()

  // Sin clic nuevo ni UTMs nuevas conservamos lo guardado (navegación interna, regreso directo)
  if (!fbclid && !hasUtm && existing) return

  // Mismo fbclid que ya teníamos (recarga): mantenemos el fbc original con su fecha de clic
  const sameClick = fbclid && existing?.fbclid === fbclid
  const fbc = fbclid
    ? sameClick
      ? existing!.fbc
      : `fb.1.${Date.now()}.${fbclid}`
    : existing?.fbc || getCookie('_fbc')

  // Formato oficial de Meta para _fbc: el pixel y CAPI leen el mismo clic
  if (fbclid && !sameClick) setCookie('_fbc', fbc)

  const data: Attribution & { savedAt: number } = {
    ...EMPTY,
    fbclid: fbclid || existing?.fbclid || '',
    fbc,
    fbp: getCookie('_fbp'),
    savedAt: Date.now(),
  }
  for (const key of UTM_KEYS) data[key] = params.get(key) ?? (hasUtm ? '' : existing?.[key] ?? '')

  try {
    localStorage.setItem(STORAGE.attribution, JSON.stringify(data))
  } catch {
    /* sin storage: la atribución vive solo en esta página */
  }
}
