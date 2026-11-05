import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useContactStore } from '@/stores/contact'
import { GHL, IS_DEV, STORAGE } from '@/config/funnel'
import {
  EMPTY_ANSWERS,
  MIN_DETAIL_WORDS,
  NURTURE_TAG,
  QUALIFIED_TAG,
  QUESTIONS,
  labelOf,
  qualifies,
  type Answers,
  type QualifyKey,
} from '@/config/qualification'
import { eventId, noteFields, postWebhook, trackMeta } from '@/utils/tracking'
import { writeJson } from '@/utils/storage'

export function useQualify(onClose: () => void) {
  const router = useRouter()
  const store = useContactStore()

  // 0..QUESTIONS.length-1 son las preguntas; QUESTIONS.length es el paso final de detalle
  const step = ref(0)
  const answers = reactive<Answers>({ ...EMPTY_ANSWERS })
  const detalle = ref('')
  const consent = ref(false)
  const submitting = ref(false)
  let timer: ReturnType<typeof setTimeout> | undefined

  const total = QUESTIONS.length + 1
  const question = computed(() => QUESTIONS[Math.min(step.value, QUESTIONS.length - 1)])
  const isFinal = computed(() => step.value === QUESTIONS.length)
  const words = computed(() => detalle.value.trim().split(/\s+/).filter(Boolean).length)
  const canSubmit = computed(() => words.value >= MIN_DETAIL_WORDS && consent.value)

  function reset() {
    clearTimeout(timer)
    step.value = 0
    Object.assign(answers, EMPTY_ANSWERS)
    detalle.value = ''
    consent.value = false
    submitting.value = false
  }

  // Avanza solo al elegir: menos fricción que un botón "siguiente" por pregunta
  function choose(key: QualifyKey, value: string) {
    answers[key] = value
    clearTimeout(timer)
    timer = setTimeout(() => step.value++, 260)
  }

  function back() {
    clearTimeout(timer)
    if (step.value > 0) step.value--
  }

  async function submit() {
    if (!canSubmit.value || submitting.value) return
    submitting.value = true

    const contact = store.contact
    const califica = qualifies(answers)
    const id = eventId(califica ? 'qualified' : 'qualify')
    const resumen = QUESTIONS.map((q) => `• ${q.title}\n  ${labelOf(q.key, answers[q.key])}`)

    const nota = [
      `${califica ? '✅ LEAD CALIFICADO' : '❌ NO CALIFICA'} — Browinn Security`,
      '━━━━━━━━━━━━━━━━━━━━━━━━',
      `👤 ${contact.nombre} ${contact.apellido}`,
      `🏢 ${contact.empresa}`,
      `📧 ${contact.email}`,
      `📱 ${contact.telefono}`,
      '━━━━━━━━━━━━━━━━━━━━━━━━',
      ...resumen,
      `📝 Detalle: ${detalle.value.trim()}`,
      '━━━━━━━━━━━━━━━━━━━━━━━━',
      `📊 Resultado: ${califica ? '🟢 AGENDA REUNIÓN' : '🔴 NO ENCAJA'}`,
      `🕐 ${new Date().toLocaleString('es-EC', { timeZone: 'America/Guayaquil' })}`,
    ]

    await postWebhook(GHL.qualifyWebhook, {
      ...contact,
      ...answers,
      detalle: detalle.value.trim(),
      califica,
      resultado: califica ? 'AGENDA' : 'NO_ENCAJA',
      qualification_status: califica ? 'qualified' : 'nurture',
      etiquetas: [
        'funnel-browinn',
        'step-2-calificacion',
        califica ? QUALIFIED_TAG : NURTURE_TAG,
        ...QUESTIONS.map((q) => `${q.key}-${answers[q.key]}`),
      ],
      ...noteFields(nota),
      event_id: id,
      event_name: califica ? 'Lead' : 'QualificationCompleted',
      timestamp: new Date().toISOString(),
    })

    if (califica) {
      // Lead ya se mandó al registrarse; quien califica es una solicitud enviada
      trackMeta(
        'SubmitApplication',
        id,
        { email: contact.email, phone: contact.telefono },
        { content_name: QUALIFIED_TAG, operacion: answers.operacion },
      )
    }

    writeJson(STORAGE.qualification, { ...answers, califica, timestamp: Date.now() })
    onClose()

    if (califica) {
      router.push('/agendar')
    } else {
      if (!IS_DEV) localStorage.setItem(STORAGE.disqualifiedAt, String(Date.now()))
      router.push('/sin-espacio')
    }
  }

  return {
    step,
    total,
    question,
    isFinal,
    answers,
    detalle,
    consent,
    words,
    canSubmit,
    submitting,
    reset,
    choose,
    back,
    submit,
  }
}
