export function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback
  } catch {
    return fallback
  }
}

export function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* modo privado o storage bloqueado */
  }
}

export function hoursSince(key: string): number {
  const at = Number(localStorage.getItem(key) ?? 0)
  return at ? (Date.now() - at) / 36e5 : Infinity
}
