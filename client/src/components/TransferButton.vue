<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const isEditPage = () => router.currentRoute.value.path === '/edit'
const getImageUrl = () => import.meta.env.VITE_CLIENT_URL + (isEditPage() ? '/look.png' : '/edit.svg')
</script>

<template>
  <RouterLink :to="isEditPage() ? '/' : '/edit'" class="button" :style="{
    backgroundImage: `url(${getImageUrl()})`
  }"></RouterLink>
</template>

<style lang="scss" scoped>
.button {
  width: 60px;
  height: 60px;

  position: fixed;
  bottom: 30px;
  right: 30px;

  background-color: #F4F5FF;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 70%;

  border: 0;
  border-radius: 10px;

  cursor: pointer;
}
</style>
