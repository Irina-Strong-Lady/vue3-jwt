<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Message from 'primevue/message'
import Loader from '../components/Loader.vue'
import Password from 'primevue/password'
import FloatLabel from 'primevue/floatlabel'

const authStore = useAuthStore()
const router = useRouter()

const email = ref()
const password = ref()

const signup = async () => {
  await authStore.auth({ email: email.value, password: password.value }, 'signup')
  router.push('/cars')
}
</script>

<template>
  <h2>Регистрация</h2>
  <form class="flex flex-column gap-4">
    <Message v-if="authStore.error" severity="warn">{{ authStore.error }}</Message>
    <Message v-else-if="authStore.userInfo.email" severity="success">Успешно!</Message>
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
        <i class="pi pi-at"></i>
      </span>
      <FloatLabel>
        <InputText v-model="email" inputId="email" />
        <label for="email">Ваш Email</label>
      </FloatLabel>
    </div>
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
        <i class="pi pi-user-edit"></i>
      </span>
      <FloatLabel>
        <Password
          v-model="password"
          inputId="password"
          promptLabel="Введите пароль"
          weakLabel="Слишком простой пароль"
          mediumLabel="Пароль средней надежности"
          strongLabel="Надежный пароль"
          toggleMask
        />
        <label for="password">Ваш пароль</label>
      </FloatLabel>
    </div>
    <Loader v-if="authStore.loader" />
    <div v-else class="flex flex-column gap-3">
      <Button label="Зарегистрироваться" @click="signup" class="p-button-sm" />
      <span>Уже зарегистрированы? <router-link to="/signin">Вход</router-link></span>
    </div>
  </form>
</template>

<style lang="sass" scoped></style>
