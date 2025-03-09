import type { MaybeRefOrGetter } from 'vue'
import { ref, toValue, watchEffect } from 'vue'
import { createMemoizedComposable } from 'vue-memoized-composable'

export const useUser = createMemoizedComposable((userId: MaybeRefOrGetter<number>) => {
  const user = ref<User | null>(null)

  console.log(2333)

  watchEffect(async () => {
    const u = await fetchUser(toValue(userId))

    if (u) {
      user.value = u
    }
  })

  return user
})

interface User {
  id: number
  name: string
}

const users: User[] = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Jim' },
  { id: 4, name: 'Jill' },
  { id: 5, name: 'Jack' },
  { id: 6, name: 'Jill' },
  { id: 7, name: 'Jack' },
  { id: 8, name: 'Jill' },
  { id: 9, name: 'Jack' },
  { id: 10, name: 'Jill' },
]

function fetchUser(id: number): Promise<User | undefined> {
  console.log('fetchUser', id)
  return new Promise<User | undefined>((resolve) => {
    setTimeout(() => {
      resolve(users.find(user => user.id === id))
    }, 1000)
  })
}
