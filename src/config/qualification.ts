// Fuente de verdad del modelo de calificación. El guion es explícito: contrato mínimo de
// 6 meses, ~30.000 USD, y no atienden necesidades puntuales (una noche, un evento).

export interface Option {
  value: string
  label: string
  icon: string
}

export interface Question {
  key: QualifyKey
  title: string
  options: Option[]
}

export type QualifyKey = 'operacion' | 'rol' | 'duracion' | 'inversion' | 'ubicacion'

export const QUESTIONS: Question[] = [
  {
    key: 'operacion',
    title: '¿Qué necesitas proteger?',
    options: [
      {
        value: 'maritima',
        label: 'Embarcaciones (custodia fluvial o marítima)',
        icon: 'fa-anchor',
      },
      { value: 'carga', label: 'Transporte de carga o bananera', icon: 'fa-truck-moving' },
      { value: 'hotel', label: 'Hotel o cadena hotelera', icon: 'fa-hotel' },
      { value: 'empresa', label: 'Empresa bancaria, comercial o industrial', icon: 'fa-building' },
      { value: 'puntual', label: 'Un evento, mi casa o algo puntual', icon: 'fa-calendar-day' },
    ],
  },
  {
    key: 'rol',
    title: '¿Cuál es tu rol en la empresa?',
    options: [
      { value: 'dueno', label: 'Dueño/a o gerente general', icon: 'fa-user-tie' },
      {
        value: 'operaciones',
        label: 'Gerente de operaciones, logística o seguridad',
        icon: 'fa-clipboard-check',
      },
      {
        value: 'administracion',
        label: 'Administración o compras',
        icon: 'fa-file-invoice-dollar',
      },
      { value: 'otro', label: 'Otro / no decido la contratación', icon: 'fa-user' },
    ],
  },
  {
    key: 'duracion',
    title: '¿Por cuánto tiempo necesitas el servicio?',
    options: [
      { value: '6_mas', label: '6 meses o más, de forma continua', icon: 'fa-calendar-check' },
      { value: '1_5', label: 'Entre 1 y 5 meses', icon: 'fa-calendar-week' },
      { value: 'puntual', label: 'Una noche o unos días', icon: 'fa-moon' },
    ],
  },
  {
    key: 'inversion',
    title: 'Un contrato con nosotros ronda los 30.000 USD. ¿Cómo estás con eso?',
    options: [
      { value: 'aprobado', label: 'Tengo el presupuesto aprobado', icon: 'fa-circle-check' },
      {
        value: 'evaluando',
        label: 'Lo estoy evaluando y puedo decidir pronto',
        icon: 'fa-scale-balanced',
      },
      { value: 'no', label: 'Busco algo más económico', icon: 'fa-circle-xmark' },
    ],
  },
  {
    key: 'ubicacion',
    title: '¿Dónde está tu operación?',
    options: [
      { value: 'guayas', label: 'Guayaquil / Guayas', icon: 'fa-location-dot' },
      {
        value: 'costa',
        label: 'El Oro, Los Ríos, Manabí u otra provincia de la Costa',
        icon: 'fa-map-location-dot',
      },
      { value: 'sierra', label: 'Quito / Sierra', icon: 'fa-mountain' },
      { value: 'otra', label: 'Otra zona o fuera de Ecuador', icon: 'fa-earth-americas' },
    ],
  },
]

export type Answers = Record<QualifyKey, string>

export const EMPTY_ANSWERS: Answers = {
  operacion: '',
  rol: '',
  duracion: '',
  inversion: '',
  ubicacion: '',
}

export const MIN_DETAIL_WORDS = 10

const QUALIFIED = {
  operacion: new Set(['maritima', 'carga', 'hotel', 'empresa']),
  rol: new Set(['dueno', 'operaciones', 'administracion']),
  duracion: new Set(['6_mas']),
  inversion: new Set(['aprobado', 'evaluando']),
}

export const QUALIFIED_TAG = 'lead-calificado-seguridad'
export const NURTURE_TAG = 'nutricion-no-califica'

// La ubicación no descalifica: se usa para asignar al comercial, no para filtrar
export function qualifies(a: Answers): boolean {
  return (
    QUALIFIED.operacion.has(a.operacion) &&
    QUALIFIED.rol.has(a.rol) &&
    QUALIFIED.duracion.has(a.duracion) &&
    QUALIFIED.inversion.has(a.inversion)
  )
}

export function labelOf(key: QualifyKey, value: string): string {
  const q = QUESTIONS.find((q) => q.key === key)
  return q?.options.find((o) => o.value === value)?.label ?? value
}
