<script setup lang="ts">
import ModalShell from '@/components/ui/ModalShell.vue'
import FormField from './FormField.vue'
import { COUNTRIES, useLeadForm } from '@/composables/useLeadForm'

defineProps<{ open: boolean; closable?: boolean }>()
const emit = defineEmits<{ close: []; done: [] }>()

const { form, country, touched, submitting, errorOf, formatPhone, submit } = useLeadForm(() =>
  emit('done'),
)
</script>

<template>
  <ModalShell
    :open="open"
    :closable="closable"
    label="Registro para ver el video"
    @close="emit('close')"
  >
    <div class="reg">
      <span class="reg__eyebrow"><i class="fa-solid fa-lock"></i> Acceso al video</span>
      <h2 class="reg__title">¿A dónde te enviamos el video?</h2>
      <p class="reg__text">
        Déjanos tus datos para ver el video completo. Lo usamos solo para contactarte sobre tu
        operación.
      </p>

      <form class="reg__form" novalidate @submit.prevent="submit">
        <div class="reg__row">
          <FormField id="nombre" label="Nombre" :error="errorOf('nombre')">
            <input
              id="nombre"
              v-model="form.nombre"
              autocomplete="given-name"
              @blur="touched.nombre = true"
            />
          </FormField>
          <FormField id="apellido" label="Apellido" :error="errorOf('apellido')">
            <input
              id="apellido"
              v-model="form.apellido"
              autocomplete="family-name"
              @blur="touched.apellido = true"
            />
          </FormField>
        </div>

        <FormField id="empresa" label="Empresa" :error="errorOf('empresa')">
          <input
            id="empresa"
            v-model="form.empresa"
            autocomplete="organization"
            @blur="touched.empresa = true"
          />
        </FormField>

        <FormField id="email" label="Correo corporativo" :error="errorOf('email')">
          <input
            id="email"
            v-model="form.email"
            type="email"
            inputmode="email"
            autocomplete="email"
            @blur="touched.email = true"
          />
        </FormField>

        <FormField id="telefono" label="WhatsApp" :error="errorOf('telefono')">
          <div class="reg__phone">
            <select v-model="country" aria-label="País">
              <option v-for="c in COUNTRIES" :key="c.code" :value="c.code">
                {{ c.code }} {{ c.dial }}
              </option>
            </select>
            <input
              id="telefono"
              v-model="form.telefono"
              type="tel"
              inputmode="tel"
              autocomplete="tel-national"
              placeholder="099 123 4567"
              @blur="formatPhone"
            />
          </div>
        </FormField>

        <button class="btn btn--primary btn--block" type="submit" :disabled="submitting">
          <i class="fa-solid" :class="submitting ? 'fa-spinner fa-spin' : 'fa-circle-play'"></i>
          {{ submitting ? 'Enviando…' : 'Ver el video ahora' }}
        </button>
        <p class="reg__legal">
          Al continuar aceptas nuestra
          <RouterLink to="/politicas-privacidad" target="_blank">política de privacidad</RouterLink
          >.
        </p>
      </form>
    </div>
  </ModalShell>
</template>

<style scoped lang="scss">
.reg {
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__eyebrow {
    @include eyebrow;
  }

  &__title {
    @include heading(clamp(1.7rem, 5vw, 2.2rem));
    padding-right: 32px;
  }

  &__text {
    color: $muted;
    font-size: 0.95rem;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-top: 8px;
  }

  &__row {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;

    > * {
      flex: 1 1 200px;
    }
  }

  &__phone {
    display: flex;
    gap: 8px;

    select {
      flex: 0 0 112px;
      padding-inline: 8px;
    }
  }

  &__legal {
    font-size: 0.78rem;
    color: $muted;
    text-align: center;

    a {
      color: $accent-light;
    }
  }
}
</style>
