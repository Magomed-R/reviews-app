<script lang="ts" setup>
import { io } from '@/libs/socket'
import { ref } from 'vue'

const props = defineProps({
  id: String,
  text: String,
  username: String,
  rating: Number,
  image_url: String,
  prevId: String,
  nextId: String
})

const getPath = (path: string) => new URL(path, import.meta.env.VITE_BASE_URL).href

const { id } = props
const rating = ref(props.rating)
const text = ref(props.text)
const username = ref(props.username)

const updateCover = async (event: Event) => {
  const input = event.target as HTMLInputElement

  if (!input.files) return

  const image = {
    filename: input.files[0].name,
    buffer: await input.files[0].arrayBuffer()
  }

  io.emit('review:update', { id, image })
}

const updateRating = async (mark: number) => {
  if (mark + 1 === rating.value) return

  rating.value = mark + 1

  io.emit('review:update', { id, rating: rating.value })
}

const updateText = async (text: string) => {
  if (text.length < 3 || text.length > 180) return

  io.emit('review:update', { id, text })
}

const updateUsername = async (username: string) => {
  if (username.length < 3 || username.length > 18) return

  io.emit('review:update', { id, username })
}

const remove = async () => {
  io.emit('review:delete', id)
}

const swap = async (firstId?: string, secondId?: string) => {
  if (!firstId || !secondId) return
  io.emit('review:swap', [firstId, secondId])
}

</script>

<template>
  <div class="card">
    <label class="cover" :style="{ backgroundImage: `url(${getPath(image_url!)})` }">
      <input type="file" @change="updateCover">
      <img class="edit-button" src="./icons/edit.svg"></img>
    </label>
    <div class="content">
      <div class="row">
        <div class="rating">
          <img src="./icons/star.svg"
            v-for="(opacity, i) in new Array(5).fill(0).map((el, i) => i + 1 <= rating! ? 1 : 0.4)" :style="{
              'opacity': opacity
            }" @click="updateRating(i)">
        </div>
        <div class="control">
          <img src="./icons/arrow_prev.svg" @click="swap(id, prevId)">
          <img src="./icons/arrow_next.svg" @click="swap(id, nextId)">
          <img src="./icons/remove.png" class="remove" @click="remove">
        </div>
      </div>
      <textarea class="comment" v-model="text" @change="updateText(text ?? '')"></textarea>
      <input class="username" v-model="username" @change="updateUsername(username ?? '')"></input>
    </div>
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
</style>
