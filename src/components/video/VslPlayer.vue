<script setup lang="ts">
import { onMounted } from 'vue'
import { VIDEO } from '@/config/funnel'

function loadScript(src: string, attr: string, module = false) {
  if (document.querySelector(`script[${attr}]`)) return
  const s = document.createElement('script')
  s.src = src
  s.async = true
  if (module) s.type = 'module'
  s.setAttribute(attr, '')
  document.head.appendChild(s)
}

onMounted(() => {
  if (!VIDEO.wistiaId) return
  loadScript('https://fast.wistia.com/player.js', 'data-wistia-player')
  loadScript(`https://fast.wistia.com/embed/${VIDEO.wistiaId}.js`, 'data-wistia-media', true)
})
</script>

<template>
  <div class="vsl">
    <wistia-player
      v-if="VIDEO.wistiaId"
      :media-id="VIDEO.wistiaId"
      aspect="1.7777777777777777"
      player-color="c8202a"
      :style="{ '--swatch': `url(https://fast.wistia.com/embed/medias/${VIDEO.wistiaId}/swatch)` }"
    />
    <div v-else class="vsl__placeholder">
      <i class="fa-solid fa-video"></i>
      <p>Aquí va el video VSL de Browinn Security</p>
      <small>Configura <code>VIDEO.wistiaId</code> en <code>src/config/funnel.ts</code></small>
    </div>
  </div>
</template>

<style scoped lang="scss">
.vsl {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 1px solid rgba($accent, 0.3);
  border-radius: $radius;
  overflow: hidden;
  background: #000;
  box-shadow: 0 30px 80px -30px rgba(0, 0, 0, 0.9);

  // Vista previa de Wistia mientras carga el reproductor
  wistia-player:not(:defined) {
    display: block;
    height: 100%;
    background: center / contain no-repeat var(--swatch);
    filter: blur(5px);
  }

  &__placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 100%;
    padding: 16px;
    text-align: center;
    color: $muted;

    i {
      font-size: 2.4rem;
      color: $accent;
    }

    code {
      color: $accent-light;
    }
  }
}
</style>
