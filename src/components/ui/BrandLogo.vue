<template>
  <RouterLink to="/" class="logo" aria-label="Browinn Security, inicio">
    <img src="/browinn-logo.jpg" alt="" width="44" height="44" class="logo__img" />
    <span class="logo__text">Browinn <strong>Security</strong></span>
  </RouterLink>
</template>

<style scoped lang="scss">
.logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: $text;

  &__img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  &__text {
    font-family: $font-heading;
    font-stretch: 125%;
    font-size: 1rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    text-transform: uppercase;

    strong {
      color: $accent-light;
      font-weight: 800;
    }
  }
}
</style>
