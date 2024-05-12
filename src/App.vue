<script setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

const token = computed(() => authStore.userInfo.token)

const checkUser = () => {
  const tokens = JSON.parse(localStorage.getItem('userTokens'))
  if (tokens) {
    authStore.userInfo.token = tokens.token
    authStore.userInfo.refreshToken = tokens.refreshToken
  }
}

const logout = () => {
  authStore.logout()
  localStorage.removeItem('userTokens')
  router.push('/signin')
}

checkUser()
</script>

<template>
  <div class="menu">
    <router-link v-if="!token && $route.name != 'home'" to="/" class="menu__link"
      >Начальниая страница</router-link
    >
    <router-link v-if="token" to="/signin" @click.prevent="logout" class="menu__link"
      >Выход</router-link
    >
  </div>
  <div class="container">
    <RouterView />
  </div>
</template>

<style lang="sass" scoped>
.container
  max-width: 500px
  margin: auto
  font-family: 'Arial', sans-serif
.menu
  display: flex
  flex-wrap: wrap
  justify-content: center
  padding-top: 50px
.menu__link
  margin-bottom: .75em
  color: #0606f7
</style>
