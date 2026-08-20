import { defineConfig as defineVitestConfig } from 'vitest/config'

export default defineVitestConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
