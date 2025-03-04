<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { api } from './libs/axios'
import { useReviewStore } from './stores/counter'
import TransferButton from './components/TransferButton.vue'
import { io } from './libs/socket'
import type { Events } from './libs/socket'

const reviewStore = useReviewStore()

onMounted(async () => {
  const req = await api.get('/reviews')

  reviewStore.createMany(req.data)
})

io.on<Events>('review:created', (review) => {
  reviewStore.create(review)
})

io.on<Events>('review:updated', (review) => {
  reviewStore.update(review)
})

io.on<Events>('review:swaped', ([first, second]) => {
  reviewStore.update(first)
  reviewStore.update(second)
})

io.on<Events>('review:deleted', (review) => {
  reviewStore.del(review)
})

</script>

<template>
  <main>
    <RouterView />
    <TransferButton />
  </main>
</template>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
}

main {
  width: 1200px;
  display: flex;
  justify-content: center;

  @media (max-width: 1200px) {
    width: 100%;
    margin: 0 4px;
  }
}

.swiper {
  margin: 0 !important;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-wrapper {
  width: 100%;
  margin-bottom: 50px;

  display: flex;
  justify-content: start;
  align-items: center;
}

.swiper-button-prev,
.swiper-button-next {
  background-image: url("./components/icons/arrow_prev.svg") !important;
  background-repeat: no-repeat;
  background-position: center center;
  z-index: 12 !important;
}

.swiper-button-next {
  background-image: url("./components/icons/arrow_next.svg") !important;
}
</style>
