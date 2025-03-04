import { ref, computed, reactive, type Reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Review } from '@/entities/Review'

export const useReviewStore = defineStore('review', () => {
  const reviews: Reactive<Array<Review>> = reactive([])

  function create(review: Review) {
    reviews.push(review)
  }

  function createMany(allReviews: Array<Review>) {
    reviews.push(...allReviews)
  }

  function update(review: Review) {
    const index = reviews.findIndex((el) => el.id === review.id)

    if (index !== -1) reviews[index] = review
  }

  function del(review: Review) {
    reviews.splice(
      reviews.findIndex((el) => el.id === review.id),
      1
    )
  }

  return { reviews, create, createMany, update, del }
})
