import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const apiKey = import.meta.env.VITE_API_KEY_FIREBASE

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref({
    token: '',
    email: '',
    userId: '',
    refreshToken: ''
  })
  const error = ref('')
  const loader = ref(false)

  const auth = async (payload, type) => {
    const stringUrl = type === 'signup' ? 'signUp' : 'signInWithPassword'
    error.value = ''
    loader.value = true
    try {
      let response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${apiKey}
      `,
        {
          ...payload,
          returnSecureToken: true
        }
      )
      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken
      }
      localStorage.setItem(
        'userTokens',
        JSON.stringify({
          token: userInfo.value.token,
          refreshToken: userInfo.value.refreshToken
        })
      )
    } catch (err) {
      console.log(err.response.data.error.message)
      switch (err.response.data.error.message) {
        case 'OPERATION_NOT_ALLOWED':
          error.value = 'Операция запрещена'
          break
        case 'INVALID_EMAIL':
          error.value = 'Email не соответствует требованиям'
          break
        case 'WEAK_PASSWORD : Password should be at least 6 characters':
          error.value = 'Пароль должен содержать не менее 6 символов'
          break
        case 'INVALID_LOGIN_CREDENTIALS':
          error.value = 'Неверные Email или пароль'
          break
        case 'EMAIL_EXISTS':
          error.value = 'Пользователь с таким email уже существует'
          break
        case 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.':
          error.value = 'Слишком много попыток. Попробуйте войти позже'
          break
        default:
          error.value = 'Ошибка'
          break
      }
      throw error.value
    } finally {
      loader.value = false
    }
  }
  const logout = () => {
    userInfo.value = {
      token: '',
      email: '',
      userId: '',
      refreshToken: ''
    }
  }
  return { auth, userInfo, error, loader, logout }
})
