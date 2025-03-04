<script lang="ts" setup>
import type { Review } from '@/entities/Review'
import { io } from '@/libs/socket'
import { reactive, ref } from 'vue'

const newReview = reactive<Pick<Review, 'text' | 'username' | 'rating'>>({
  text: '',
  username: '',
  rating: 5,
})
const created = ref(false)
const image = ref<{ filename: string, buffer: ArrayBuffer } | null>(null)

const uploadCover = async (event: Event) => {
  const input = event.target as HTMLInputElement

  if (!input.files) return

  image.value = {
    filename: input.files[0].name,
    buffer: await input.files[0].arrayBuffer()
  }

  saveIfReady()
}

const saveIfReady = async () => {
  const { username, text, rating } = newReview
  if (!username || !text || text.length < 3 || !image.value) return

  io.emit('review:create', { text, username, rating, image: image.value })

  newReview.text = ''
  newReview.username = ''
  image.value = null
  created.value = false
}

</script>

<template>
  <div class="card" v-if="created">
    <label class="cover" :class="{ 'uploaded': image }">
      <input type="file" @change="uploadCover">
      <img class="edit-button" src="./icons/edit.svg"></img>
    </label>
    <div class="content">
      <div class="row">
        <div class="rating">
          <img src="./icons/star.svg"
            v-for="(opacity, i) in new Array(5).fill(0).map((el, i) => i + 1 <= newReview.rating! ? 1 : 0.4)" :style="{
              'opacity': opacity
            }" @click="newReview.rating = i + 1">
        </div>
        <div class="control">
          <img src="./icons/remove.png" class="remove" @click="created = false">
        </div>
      </div>
      <textarea class="comment" v-model="newReview.text" @change="saveIfReady"></textarea>
      <input class="username" v-model="newReview.username" @change="saveIfReady"></input>
    </div>
  </div>

  <div class="card empty-card" v-else @click="created = true">
    <img src="./icons/add.png">
  </div>
</template>

<style lang="scss" scoped>
.card {
  .cover {
    cursor: pointer;
    transition: 0.5s all;

    display: flex;
    justify-content: center;
    align-items: center;

    input {
      display: none;
    }

    .edit-button {
      opacity: 0;
      transition: 0.5s all;
    }

    &:hover {
      opacity: 0.8;

      .edit-button {
        opacity: 1;
      }
    }
  }

  .content {
    .row {
      display: flex;
      justify-content: space-between;

      .control {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;

        * {
          height: 16px;
          cursor: pointer;
        }

        .remove {
          scale: 1.3;
        }
      }
    }

    .comment {
      width: 100%;
      height: 100%;

      resize: none;
      border: 1px solid #0004;
      border-radius: 4px;

      padding: 6px;
    }

    .username {
      border: 1px solid #0004;
      border-radius: 4px;
      padding: 4px;
    }
  }
}

.empty-card {
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  img {
    width: 60px;
  }
}

.uploaded {
  background: linear-gradient(180deg, rgba(138, 127, 14, 1) 0%, rgba(255, 126, 0, 1) 100%);
}
</style>
