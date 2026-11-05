import { computed, reactive, ref } from 'vue'
import {
  AsYouType,
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  type CountryCode,
} from 'libphonenumber-js'
import { useContactStore, type Contact } from '@/stores/contact'
import { GHL } from '@/config/funnel'
import { eventId, noteFields, postWebhook, trackMeta } from '@/utils/tracking'

const PRIORITY: CountryCode[] = ['EC', 'CO', 'PE', 'PA', 'MX', 'CL', 'US', 'ES']
const regionNames = new Intl.DisplayNames(['es'], { type: 'region' })

export const COUNTRIES = [
  ...PRIORITY,
  ...getCountries()
    .filter((c) => !PRIORITY.includes(c))
    .sort((a, b) => (regionNames.of(a) ?? a).localeCompare(regionNames.of(b) ?? b)),
].map((code) => ({
  code,
  name: regionNames.of(code) ?? code,
  dial: `+${getCountryCallingCode(code)}`,
}))

type Field = 'nombre' | 'apellido' | 'empresa' | 'email' | 'telefono'

export function useLeadForm(onDone: () => void) {
  const store = useContactStore()
  const saved = store.contact

  const country = ref<CountryCode>('EC')
  const form = reactive({
    nombre: saved.nombre,
    apellido: saved.apellido,
    empresa: saved.empresa,
    email: saved.email,
    telefono: '',
  })
  const touched = reactive<Partial<Record<Field, boolean>>>({})
  const submitting = ref(false)

  const phone = computed(() => parsePhoneNumberFromString(form.telefono, country.value))

  const errors = computed(() => {
    const e: Partial<Record<Field, string>> = {}
    if (form.nombre.trim().length < 2) e.nombre = 'Ingresa tu nombre'
    if (form.apellido.trim().length < 2) e.apellido = 'Ingresa tu apellido'
    if (form.empresa.trim().length < 2) e.empresa = 'Ingresa el nombre de tu empresa'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Correo inválido'
    if (!phone.value?.isValid()) e.telefono = 'Número inválido para el país elegido'
    return e
  })

  // Un campo vacío no se marca en rojo solo por pasar por él: el error aparece si la persona
  // escribió algo inválido o si intentó enviar el formulario
  const attempted = ref(false)
  const errorOf = (f: Field) =>
    touched[f] && (attempted.value || form[f].trim()) ? errors.value[f] : undefined

  function formatPhone() {
    touched.telefono = true
    form.telefono = new AsYouType(country.value).input(form.telefono.replace(/[^\d+\s()-]/g, ''))
  }

  async function submit() {
    attempted.value = true
    ;(['nombre', 'apellido', 'empresa', 'email', 'telefono'] as Field[]).forEach(
      (f) => (touched[f] = true),
    )
    if (Object.keys(errors.value).length) return

    submitting.value = true
    const pais = regionNames.of(country.value) ?? country.value
    const contact: Contact = {
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      empresa: form.empresa.trim(),
      email: form.email.trim().toLowerCase(),
      telefono: phone.value!.format('E.164'),
      pais,
    }
    const id = eventId('lead')

    const notas = [
      '📝 NUEVO CONTACTO — Browinn Security',
      '━━━━━━━━━━━━━━━━━━━━━━━━',
      `👤 ${contact.nombre} ${contact.apellido}`,
      `🏢 Empresa: ${contact.empresa}`,
      `📧 ${contact.email}`,
      `📱 ${phone.value!.formatInternational()}`,
      `🌎 País: ${pais}`,
      '━━━━━━━━━━━━━━━━━━━━━━━━',
      `🕐 ${new Date().toLocaleString('es-EC', { timeZone: 'America/Guayaquil' })}`,
    ]

    await postWebhook(GHL.contactWebhook, {
      ...contact,
      ...noteFields(notas),
      etapa: 'registro',
      etiquetas: ['funnel-browinn', 'step-1-registro'],
      event_id: id,
      event_name: 'CompleteRegistration',
      qualification_status: 'pending',
      timestamp: new Date().toISOString(),
    })
    // El registro es el lead de la campaña: Metrics y las campañas de "Clientes potenciales"
    // cuentan Lead, no CompleteRegistration. Se mandan los dos, cada uno con su event_id.
    const user = { email: contact.email, phone: contact.telefono }
    trackMeta('CompleteRegistration', id, user, { content_name: 'registro-vsl' })
    trackMeta('Lead', eventId('reglead'), user, { content_name: 'registro-vsl' })

    store.save(contact)
    submitting.value = false
    onDone()
  }

  return { form, country, touched, submitting, errorOf, formatPhone, submit }
}
