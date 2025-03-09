<script setup lang="ts">
import { ref } from 'vue'
import User from './components/User.vue'

const userIds = ref([1, 2, 3])

function addUser() {
  userIds.value.push(userIds.value.length + 1)
}

function removeUser(userId: number) {
  userIds.value = userIds.value.filter(id => id !== userId)
}
</script>

<template>
  <div>
    <button @click="addUser">
      add user
    </button>
    <User v-for="userId in userIds" :key="userId" :user-id="userId" @remove-user="removeUser" />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
