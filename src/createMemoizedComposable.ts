/**
 * Thanks to vueuse
 * @link https://github.com/vueuse/vueuse/blob/main/packages/shared/createSharedComposable/index.ts
 */
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, effectScope, toValue, watch } from 'vue'
import { tryOnScopeDispose } from './tryOnScopeDispose'

let counter = 0

interface State<T> {
  value: T
  count: number
}

/**
 * Memoize a composable
 * @param composable - The composable to memoize
 * @returns The memoized composable
 */
export function createMemoizedComposable<T extends (...args: any[]) => any>(composable: T): T {
  const innerCounter = counter++
  const createQueryKey = (...args: any[]): any[] => ['CREATE_MEMOIZED_COMPOSABLE', innerCounter, ...args]

  return <T>((...args) => {
    const queryClient = useQueryClient()

    const key = createQueryKey(...args)

    const { data: state } = useQuery<State<ReturnType<T>>>({ queryKey: key })

    const scope = effectScope(false)

    const cleanupArr: (() => void)[] = []

    const { stop } = watch(state, (state) => {
      if (!state) {
        scope.run(() => {
          const handler = watch(composable(...args), (value) => {
            queryClient.setQueryData(key, {
              value,
              count: 0,
            })
          }, {
            immediate: true,
          })

          cleanupArr.push(() => handler.stop())
        })
      }
    }, {
      immediate: true,
    })

    const changeCount = (step: number): number => {
      const value = queryClient.getQueryData<State<ReturnType<T>>>(key)!
      const newCount = value.count + step
      queryClient.setQueryData(key, {
        value: value.value,
        count: newCount,
      })

      return newCount
    }

    changeCount(1)

    cleanupArr.push(() => stop())
    cleanupArr.push(() => scope.stop())

    tryOnScopeDispose(() => {
      cleanupArr.forEach(fn => fn())
      const count = changeCount(-1)
      console.log('tryOnScopeDispose', count)

      if (count <= 0) {
        queryClient.removeQueries({ queryKey: key })
        console.log('removeQueries', key.map(toValue))
      }
    })

    const value = computed(() => {
      return state.value?.value ?? undefined
    })

    return value
  })
}
