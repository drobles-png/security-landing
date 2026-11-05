# Browinn Security — VSL Funnel

Landing VSL de **Browinn Security** (Guayaquil): custodia fluvial/marítima, custodia terrestre
de carga, vigilancia hotelera y empresarial. Contratos desde 6 meses, ~30.000 USD.
Instagram: https://www.instagram.com/browinnsecuritycia/
Marca (sacada del IG): azul marino `#0a1225` + rojo `#cc252e`, logo águila en escudo.

## Stack
Vue 3 + Vite + TypeScript, SCSS propio, Pinia, vue-router, libphonenumber-js.
Font Awesome por CDN (sin emojis en la UI). Deploy en Vercel (`api/capi.ts` es serverless).

```sh
pnpm install
pnpm dev      # en localhost: sin gates, countdown de 3 s, no guarda descalificación
pnpm build    # vue-tsc + vite build: es la única verificación
```

## Flujo
```
/                 → Hero + secciones del guion → RegistrationModal
/ver-video        → VSL (Wistia) + CTA que se desbloquea tras VIDEO.unlockSeconds
                    → QualifyModal (5 preguntas + detalle)
/agendar          → calendario GHL (o fallback WhatsApp) — solo si califica
/cita-confirmada  → confirmación
/sin-espacio      → no encaja (bloquea volver a / por 24 h)
```

## Dónde vive cada cosa
- `src/config/funnel.ts` — webhooks GHL, calendario, Wistia, WhatsApp, claves de storage.
  **Lo que esté vacío se omite sin romper nada.**
- `src/config/copy.ts` — todo el texto, sacado del guion del VSL. No escribir copy en componentes.
- `src/config/qualification.ts` — preguntas y regla de calificación (fuente de verdad).
- `src/utils/tracking.ts` — webhooks + Pixel/CAPI con event_id compartido.
- `src/styles/tokens.scss` — se antepone a cada `<style lang="scss">`: solo variables y mixins.
  Lo que emite CSS va en `global.scss`.

## Reglas
- Ningún `.vue` pasa de 300 líneas: la lógica va a `src/composables/`.
- Layout con flexbox; grillas con `@include flex-cards($basis)`.
- No usar handlers con `;` en el template: Prettier los rompe. Usar una función.

## Pendiente del cliente
- Wistia ID del video, WhatsApp, dominio.
- Logo en alta (SVG o PNG): hoy usamos la foto de perfil de Instagram, que solo viene en 150 px (`public/browinn-logo.jpg`).
- Webhooks de GHL (contacto y calificación). El calendario ya está (`XwbHm5Lu5epVMUTJQpWS`).
- Meta Pixel ID (snippet en `index.html` + `META_PIXEL_ID` y `META_CAPI_TOKEN` en Vercel).
- Del guion: nombre y cargo del vocero, términos de seguimiento del protocolo,
  clientes corporativos que autoricen ser mencionados.
