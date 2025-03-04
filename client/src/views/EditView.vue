<script land="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useReviewStore } from '@/stores/counter'
import EditCard from '@/components/EditCard.vue'
import NewCard from '@/components/NewCard.vue'

const { reviews } = useReviewStore()

const getSliderPer = () => window.innerWidth > 750 ? window.innerWidth > 1150 ? 3 : 2 : 1
</script>

<template>
  <swiper :slides-per-view="getSliderPer()" :space-between="16" :pagination="{
    clickable: true
  }" :navigation="{ enabled: true }" :modules="[Navigation, Pagination]">
    <SwiperSlide v-for="({ id, text, username, image_url, rating }, i) in reviews.sort((a, b) => a.order - b.order)"
      :key="id">
      <EditCard :id="id" :text="text" :username="username" :image_url="image_url" :rating="rating"
        :prevId="reviews[i - 1]?.id" :nextId="reviews[i + 1]?.id" />
    </SwiperSlide>

    <SwiperSlide>
      <NewCard />
    </SwiperSlide>
  </swiper>
</template>
