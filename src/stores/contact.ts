import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { STORAGE } from '@/config/funnel'
import { readJson, writeJson } from '@/utils/storage'

export interface Contact {
  nombre: string
  apellido: string
  empresa: string
  email: string
  telefono: string
  pais: string
}

const EMPTY: Contact = { nombre: '', apellido: '', empresa: '', email: '', telefono: '', pais: '' }

export const useContactStore = defineStore('contact', () => {
  const contact = ref<Contact>(readJson(STORAGE.contact, { ...EMPTY }))
  const hasContact = computed(() => !!contact.value.email && !!contact.value.nombre)

  function save(data: Contact) {
    contact.value = { ...data }
    writeJson(STORAGE.contact, { ...data, timestamp: Date.now() })
  }

  return { contact, hasContact, save }
})
