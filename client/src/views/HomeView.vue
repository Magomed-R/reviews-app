<script land="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper/modules'
import ReviewCard from '@/components/ReviewCard.vue'
import 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useReviewStore } from '@/stores/counter'

const { reviews } = useReviewStore()

const getSliderPer = () => window.innerWidth > 670 ? window.innerWidth > 1150 ? 3 : 2 : 1
</script>

<template>
  <swiper :slides-per-view="getSliderPer()" :space-between="16" :pagination="{
    clickable: true
  }" :navigation="{ enabled: true }" :modules="[Navigation, Pagination]">
    <SwiperSlide v-for="({ id, text, username, image_url, rating }, i) in reviews.sort((a, b) => a.order - b.order)"
      :key="id">
      <ReviewCard :text="text" :username="username" :image_url="image_url" :rating="rating" />
    </SwiperSlide>
  </swiper>
</template>
