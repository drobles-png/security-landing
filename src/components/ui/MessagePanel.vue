<script setup lang="ts">
// Página centrada con ícono, título y texto: confirmación, rechazo y avisos
defineProps<{ icon: string; title: string; tone?: 'accent' | 'success' }>()
</script>

<template>
  <section class="msg">
    <div class="msg__inner">
      <span class="msg__icon" :class="`msg__icon--${tone ?? 'accent'}`">
        <i class="fa-solid" :class="icon"></i>
      </span>
      <h1 class="msg__title">{{ title }}</h1>
      <div class="msg__body"><slot /></div>
      <div v-if="$slots.actions" class="msg__actions"><slot name="actions" /></div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.msg {
  padding-block: 64px 96px;

  &__inner {
    @include container(680px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    text-align: center;
  }

  &__icon {
    display: grid;
    place-items: center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    font-size: 2rem;

    &--accent {
      color: $accent;
      background: rgba($accent, 0.12);
    }

    &--success {
      color: $success;
      background: rgba($success, 0.12);
    }
  }

  &__title {
    @include heading(clamp(2rem, 6vw, 3rem));
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 14px;
    color: $muted;
    font-size: 1.05rem;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    margin-top: 8px;
  }
}
</style>
