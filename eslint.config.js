// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'lib',
    vue: true,
  },
  {
    rules: {
      'no-console': 'off',
    },
  },
)
