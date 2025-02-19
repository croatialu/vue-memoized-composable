/**
 * Thanks to vueuse
 * @link https://github.com/vueuse/vueuse/blob/main/packages/shared/createSharedComposable/index.ts
 */
import { useQueryClient } from '@tanstack/vue-query'
import { isRef, watch } from 'vue'
import { tryOnScopeDispose } from './tryOnScopeDispose'

let counter = 0

/**
 * Memoize a composable
 * @param composable - The composable to memoize
 * @returns The memoized composable
 */
export function createMemoizedComposable<T extends (...args: any[]) => any>(composable: T): T {
  counter++
  const createQueryKey = (...args: any[]): any[] => ['CREATE_MEMOIZED_COMPOSABLE', counter, ...args]

  return <T>((...args) => {
    const queryClient = useQueryClient()

    const key = createQueryKey(...args)

    let state = queryClient.getQueryData(key)

    if (!state) {
      const newState = composable(...args)
      state = newState
      queryClient.setQueryData(key, state)

      watch(key.filter(v => isRef(v)), () => {
        queryClient.setQueryData(key, newState)
      }, { deep: true })

      tryOnScopeDispose(() => {
        queryClient.removeQueries({ queryKey: key })
      })
    }

    return state
  })
}
