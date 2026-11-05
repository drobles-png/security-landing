<script setup lang="ts">
import { watch } from 'vue'
import ModalShell from '@/components/ui/ModalShell.vue'
import { MIN_DETAIL_WORDS } from '@/config/qualification'
import { useQualify } from '@/composables/useQualify'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const q = useQualify(() => emit('close'))
const { step, total, question, isFinal, answers, detalle, consent, words, canSubmit, submitting } =
  q

watch(
  () => props.open,
  (v) => v && q.reset(),
)
</script>

<template>
  <ModalShell :open="open" label="Solicitud de reunión comercial" @close="emit('close')">
    <div class="qz">
      <div class="qz__progress" aria-hidden="true">
        <span :style="{ width: `${((step + 1) / total) * 100}%` }"></span>
      </div>
      <span class="qz__count">Paso {{ step + 1 }} de {{ total }}</span>

      <Transition name="fade" mode="out-in">
        <fieldset v-if="!isFinal" :key="question.key" class="qz__step">
          <legend class="qz__title">{{ question.title }}</legend>
          <label
            v-for="o in question.options"
            :key="o.value"
            class="qz__option"
            :class="{ 'qz__option--on': answers[question.key] === o.value }"
          >
            <input
              type="radio"
              :name="question.key"
              :value="o.value"
              :checked="answers[question.key] === o.value"
              @change="q.choose(question.key, o.value)"
            />
            <i class="fa-solid" :class="o.icon"></i>
            <span>{{ o.label }}</span>
          </label>
        </fieldset>

        <form v-else key="final" class="qz__step" @submit.prevent="q.submit">
          <label for="detalle" class="qz__title">
            Cuéntanos brevemente qué quieres proteger y qué riesgo te preocupa hoy
          </label>
          <textarea
            id="detalle"
            v-model="detalle"
            rows="5"
            placeholder="Ej.: Tenemos 3 embarcaciones que salen de Puerto Bolívar dos veces por semana y nos preocupa…"
          ></textarea>
          <small class="qz__words" :class="{ 'qz__words--ok': words >= MIN_DETAIL_WORDS }">
            {{ words }} / {{ MIN_DETAIL_WORDS }} palabras mínimo
          </small>
          <label class="qz__consent">
            <input v-model="consent" type="checkbox" />
            <span>Acepto que Browinn Security me contacte para coordinar la reunión.</span>
          </label>
          <button
            class="btn btn--primary btn--block"
            type="submit"
            :disabled="!canSubmit || submitting"
          >
            <i class="fa-solid" :class="submitting ? 'fa-spinner fa-spin' : 'fa-paper-plane'"></i>
            {{ submitting ? 'Enviando…' : 'Enviar solicitud' }}
          </button>
        </form>
      </Transition>

      <button v-if="step > 0" class="qz__back" type="button" @click="q.back">
        <i class="fa-solid fa-arrow-left"></i> Atrás
      </button>
    </div>
  </ModalShell>
</template>

<style scoped lang="scss">
.qz {
  display: flex;
  flex-direction: column;
  gap: 14px;

  &__progress {
    height: 4px;
    margin-right: 40px;
    border-radius: 4px;
    background: $surface-2;
    overflow: hidden;

    span {
      display: block;
      height: 100%;
      background: $accent;
      transition: width 0.3s ease;
    }
  }

  &__count {
    font-size: 0.8rem;
    color: $muted;
  }

  &__step {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 0;
    margin: 0;
    padding: 0;
    border: 0;
  }

  &__title {
    @include heading(clamp(1.45rem, 4.5vw, 1.8rem));
    margin-bottom: 8px;
    padding: 0;
  }

  &__option {
    position: relative;
    display: flex;
    align-items: center;
    gap: 14px;
    min-height: 56px;
    padding: 12px 16px;
    border: 1px solid $line;
    border-radius: $radius-sm;
    background: $ink;
    cursor: pointer;
    transition:
      border-color 0.2s ease,
      background 0.2s ease;

    input {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }

    i {
      width: 22px;
      text-align: center;
      color: $accent;
    }

    &:hover,
    &:has(input:focus-visible) {
      border-color: rgba($accent, 0.5);
    }

    &--on {
      border-color: $accent;
      background: rgba($accent, 0.1);
    }
  }

  textarea {
    width: 100%;
    padding: 14px;
    border: 1px solid $line;
    border-radius: $radius-sm;
    background: $ink;
    color: $text;
    font: inherit;
    font-size: 16px;
    resize: vertical;

    &:focus {
      outline: none;
      border-color: $accent;
    }
  }

  &__words {
    color: $muted;
    font-size: 0.8rem;

    &--ok {
      color: $success;
    }
  }

  &__consent {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    font-size: 0.88rem;
    color: $muted;
    cursor: pointer;

    input {
      margin-top: 4px;
      accent-color: $accent;
    }
  }

  &__back {
    align-self: flex-start;
    border: 0;
    background: none;
    color: $muted;
    cursor: pointer;
    padding: 8px 0;

    &:hover {
      color: $text;
    }
  }
}
</style>
