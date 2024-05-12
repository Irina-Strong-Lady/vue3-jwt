<script setup></script>

<template>
  <div class="container">
    <div class="wrapper">
      <h2 class="title">Начальная страница</h2>
      <div class="wrapper">
        <h3><router-link to="/signup">Регистрация</router-link></h3>
        <h3><router-link to="/signin">Вход</router-link></h3>
        <h3><router-link to="/cars">Автомобили</router-link></h3>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.container
  display: flex
  flex-wrap: nowrap
  align-items: center
  justify-content: space-between
  max-width: 100vw
.wrapper
  width: 100%
  color: blue
  text-align: center
  &:hover, &:active, &:focus
    cursor: pointer
    color: aqua
.title
  color: blue
  text-decoration: none
</style>
