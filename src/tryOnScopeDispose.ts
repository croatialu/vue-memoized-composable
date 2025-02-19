/**
 * Copied from vueuse
 * @link https://github.com/vueuse/vueuse/blob/main/packages/shared/tryOnScopeDispose/index.ts
 */
import { getCurrentScope, onScopeDispose } from 'vue'

/**
 *
 * @param fn
 * @link https://github.com/vueuse/vueuse/blob/main/packages/shared/tryOnScopeDispose/index.ts
 */
export function tryOnScopeDispose(fn: () => void): boolean {
  if (getCurrentScope()) {
    onScopeDispose(fn)
    return true
  }
  return false
}
