import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  externals: ['@tanstack/vue-query', 'vue'],
  clean: true,
})
