<script setup lang="ts">
import { toRef } from 'vue'
import { useModalBehavior } from '@/composables/useModal'

const props = defineProps<{ open: boolean; label: string; closable?: boolean }>()
const emit = defineEmits<{ close: [] }>()

const close = () => props.closable !== false && emit('close')
useModalBehavior(toRef(props, 'open'), close)
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="modal" @click.self="close">
        <div class="modal__panel" role="dialog" aria-modal="true" :aria-label="label">
          <button
            v-if="closable !== false"
            class="modal__close"
            type="button"
            aria-label="Cerrar"
            @click="close"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);

  @include from('sm') {
    align-items: center;
    padding: 24px 16px;
  }

  &__panel {
    position: relative;
    width: 100%;
    max-width: 560px;
    max-height: 94dvh;
    overflow-y: auto;
    padding: 32px 20px 24px;
    background: $surface;
    border: 1px solid $line;
    border-radius: $radius $radius 0 0;

    @include from('sm') {
      padding: 36px 32px 28px;
      border-radius: $radius;
    }
  }

  &__close {
    position: absolute;
    top: 12px;
    right: 12px;
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: $muted;
    font-size: 1.2rem;
    cursor: pointer;

    &:hover {
      color: $text;
      background: $surface-2;
    }
  }
}
</style>
