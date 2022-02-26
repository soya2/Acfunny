<template>
  <div
    :class="{
      'card-container': type === 'vertical',
      'recommend-item': type === 'horizontal',
      'slide-border': !isEdit
    }"
  >
    <img :src="cover" @click="handleClick(videoData.id)" />
    <div class="item-info">
      <span class="title" @click="handleClick(videoData.id)">{{ videoData.title }}</span>
      <span class="poster">{{ videoData.posterName }}</span>
    </div>
    <div v-if="isEdit" class="operate">
      <button class="btn-primary btn-lg" @click="handleClickOperate('edit')">修改</button>
      <button class="btn-primary-plain btn-lg" @click="handleClickOperate('delete')">删除</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { useRouter } from 'vue-router'
import { ImagesApi } from '@/api'

export interface VideoData {
  id: number;
  title: string;
  posterName: string;
  cover: string;
  summary: string;
  tags: string;
}

export default defineComponent({
  name: 'VideoCard',
  props: {
    type: {
      type: String,
      default: 'vertical'
    },
    videoData: {
      type: Object as PropType<VideoData>,
      required: true
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  emits: ['edit', 'delete'],
  setup (props, ctx) {
    const cover = ref('')
    const getCover = async (name: string) => {
      if (name.trim() === '') return
      cover.value = await ImagesApi.getImage(name)
    }
    getCover(props.videoData.cover)
    const router = useRouter()
    const handleClick = (id: number) => {
      if (props.isEdit) return
      router.push({
        path: '/video',
        query: { id }
      })
    }

    const handleClickOperate = (type: 'edit' | 'delete') => {
      ctx.emit(type, props.videoData)
    }

    return {
      cover,
      handleClick,
      handleClickOperate
    }
  }
})
</script>

<style lang="scss" scoped>
.card-container {
  padding: 4px;
  margin: 4px 8px;
  border-radius: 4px;
  & > * { cursor: pointer; }
  &:not(:first-child) { padding-left: 8px; }
  &:hover img { box-shadow: 0 4px 12px #d7d7d7; }
  &:hover .title,.poster { color: red; }
  img { width: 100%; height: 64%; }
}
.recommend-item {
  display: flex;
  border-radius: 4px;
  padding: .2rem;
  height: 6rem;
  &:hover .title,.poster { color: red; }
  img { margin-right: .6rem; }
}
img {
  height: 6rem;
  width: 10rem;
  border-radius: 4px;
  box-shadow: 0 2px 8px 4px rgb(232, 232, 232);
  cursor: pointer;
}
.item-info {
  flex-grow: 1;
  & > * { cursor: pointer; }
  .title {
    transition: .2s;
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
.operate {
  display: flex;
  align-items: flex-end;
  & > * { margin-left: .4rem; }
}
</style>
