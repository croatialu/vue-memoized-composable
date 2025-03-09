<script lang="ts" setup>
import { computed } from 'vue'
import { useUser } from '../composables/useUser'

const props = defineProps<{
  userId: number
}>()

const emit = defineEmits<{
  (e: 'removeUser', userId: number): void
}>()

const user = useUser(computed(() => props.userId))

function removeUser() {
  emit('removeUser', props.userId)
}
</script>

<template>
  <div class="user">
    <div>
      <div>
        <span>id: </span>
        <span>{{ user?.id }}</span>
      </div>
      <div>
        <span>name: </span>
        <span>{{ user?.name }}</span>
      </div>
    </div>
    <button @click="removeUser">
      remove user
    </button>
  </div>
</template>

<style scoped>
.user {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
