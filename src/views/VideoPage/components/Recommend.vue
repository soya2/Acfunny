<template>
  <h3 style="margin: 0 0 1em 0;">大家都在看</h3>
  <div
    v-for="item in recommendList"
    :key="item.id"
    class="recommend-item slide-border"
  >
    <img :src="item.url"/>
    <div class="item-info">
      <span class="title">{{ item.title }}</span>
      <span class="poster">{{ item.poster }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { VideoData } from '@/components/VideoCard.vue'
export default defineComponent({
  name: 'Recommend',
  setup () {
    const recommendList = ref([] as VideoData[])
    recommendList.value = [
      {
        id: 1,
        title: '自制卫生纸加热砂锅',
        poster: '手工耿',
        url: 'https://pixiv.pximg.net/c/1200x630_90_a2_g5/fanbox/public/images/post/2689072/cover/dVVEc1GirTekQL9n0E76dwBW.jpeg'
      },
      {
        id: 2,
        title: '四伯点菜想吃“盐焗猪肝”，六斤盐巴焗两斤猪肝，巴适惨了',
        poster: '美食作家王刚',
        url: 'https://downloads.fanbox.cc/images/post/1871392/w/1200/UB9mkYoIzClak3IC520Qhomj.jpeg'
      }
    ]

    return {
      recommendList
    }
  }
})
</script>

<style lang="scss" scoped>
.recommend-item {
  display: flex;
  border-radius: 4px;
  padding: .2rem;
  height: 6rem;
  img {
    height: 6rem;
    width: 10rem;
    border-radius: 4px;
    box-shadow: 0 2px 8px 4px rgb(232, 232, 232);
    cursor: pointer;
  }
  .item-info {
    margin-left: .6rem;
    & > * { cursor: pointer; }
    .title {
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .poster {
      color: #969696;
      font-size: .8rem;
    }
  }
}
</style>
