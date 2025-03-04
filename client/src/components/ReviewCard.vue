<script lang="ts" setup>
defineProps({
  text: String,
  username: String,
  rating: Number,
  image_url: String
})

const getPath = (path: string) => new URL(path, import.meta.env.VITE_BASE_URL).href
</script>

<template>
  <div class="card">
    <div class="cover" :style="{ backgroundImage: `url(${getPath(image_url!)})` }"></div>
    <div class="content">
      <div class="rating">
        <img src="./icons/star.svg" v-for="opacity in new Array(5).fill(0).map((el, i) => i + 1 <= rating! ? 1 : 0.4)"
          :style="{
            'opacity': opacity
          }">
      </div>
      <div class="comment">{{ text }}</div>
      <div class="username">{{ username }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.card {
  width: auto;
  min-width: 352px;
  height: 242px;

  border-radius: 20px;
  border: 2px solid #B2B0C0;
  background-color: #F4F5FF;

  padding: 16px;

  display: flex;
  gap: 24px;

  .cover {
    min-width: 120px;
    height: 210px;
    justify-content: space-between;
    border-radius: 12px;

    background-size: auto 100%;
    background-position: center center;
    background-repeat: no-repeat;
  }

  @media (max-width: 400px) {
    min-width: 320px;
    height: 202px;

    .cover {
      min-width: 88px;
      height: 154px;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .rating {
      display: flex;
      justify-content: start;
      align-items: center;
    }

    .comment {
      width: 100%;
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .username {
      font-weight: 700;
    }
  }
}
</style>
