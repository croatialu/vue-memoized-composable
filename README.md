# vue-memoized-composable

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

A Vue composable that memoizes the result of a function.

## Install

```bash
pnpm install vue-memoized-composable
```

## Example

```ts
import { createMemoizedComposable } from 'vue-memoized-composable'

const useUser = createMemoizedComposable((userId: Ref<string>) => {
  const { data } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId.value),
  })

  console.log('useUser', userId.value)

  return data
})

const userId = ref('1')

const user1 = useUser(userId)
const user2 = useUser(userId)
// user1 and user2 will be the same
// useUser will be called only once
// logs: useUser 1

const userId3 = ref('2')
const user3 = useUser(userId3)
// user3 will be a new instance
// useUser will be called again
// logs: useUser 2
```

## Thanks

- [vueuse](https://github.com/vueuse/vueuse)
- [@tanstack/vue-query](https://github.com/TanStack/query)

## License

[MIT](./LICENSE) License © [Croatia Lu](https://github.com/croatialu)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/vue-memoized-composable?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/vue-memoized-composable
[npm-downloads-src]: https://img.shields.io/npm/dm/vue-memoized-composable?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/vue-memoized-composable
[bundle-src]: https://img.shields.io/bundlephobia/minzip/vue-memoized-composable?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=vue-memoized-composable
[license-src]: https://img.shields.io/github/license/croatialu/vue-memoized-composable.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/croatialu/vue-memoized-composable/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/vue-memoized-composable
