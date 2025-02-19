/**
 * Thanks to vueuse
 * @link https://github.com/vueuse/vueuse/blob/main/packages/shared/createSharedComposable/index.ts
 */
import type { EffectScope } from 'vue'
import { useQueryClient } from '@tanstack/vue-query'
import { effectScope, markRaw } from 'vue'
import { tryOnScopeDispose } from './tryOnScopeDispose'

let counter = 0

interface State {
  value: any
  subscribers: number
  scope: EffectScope
}

/**
 * Memoize a composable
 * @param composable - The composable to memoize
 * @returns The memoized composable
 */
export function createMemoizedComposable<T extends (...args: any[]) => any>(composable: T): T {
  counter++

  return <T>((...args) => {
    const queryClient = useQueryClient()

    const key = ['CREATE_STD_SHARE_COMPOSABLE', counter, ...args]

    const getState = (): State | undefined => queryClient.getQueryData<State>(key)
    let state = getState()

    if (!state) {
      const scope = effectScope(true)
      const value = scope.run(() => composable(...args))

      const newState = {
        value,
        subscribers: 1,
        scope: markRaw(scope),
      }

      queryClient.setQueryData(key, newState)
      state = newState
    }
    else {
      const newSubscribers = state.subscribers + 1

      queryClient.setQueryData(key, {
        ...state,
        subscribers: newSubscribers,
      })
    }

    tryOnScopeDispose(() => {
      const state = getState()

      if (!state)
        return

      const newSubscribers = state.subscribers - 1

      if (newSubscribers > 0) {
        queryClient.setQueryData(key, {
          ...state,
          subscribers: newSubscribers,
        })
        return
      }

      state.scope.stop()
      queryClient.removeQueries({ queryKey: key })
    })

    return state.value
  })
}
