<template>
  <div>
    <h3>视频管理</h3>
    <transition name="horizontal" mode="out-in">
      <div v-if="!isEdit">
        <VideoCard
          v-for="item in videoList"
          :key="item.id"
          :videoData="item"
          type="horizontal"
          isEdit
          @edit="handleClickEdit"
          @delete="handleClickDelete"
        />
      </div>
      <div v-else>
        <h3>编辑视频</h3>
        <form>
          <label for="cover">视频封面：</label>
          <Upload
            accept=".jpg,.png"
            :hasUpload="false"
            @handleChooseFile="handleChoose"
            @handleClickDelete="handleDeleteChoose"
          />
          <img :src="coverImg" /><br />
          <label for="title">视频标题：</label>
          <input
            id="title"
            placeholder="视频标题"
            v-model="editObject.title"
          />
          <label for="summary">视频简介：</label>
          <textarea
            id="summary"
            placeholder="视频简介"
            v-model="editObject.summary"
          />
          <label for="tags">视频标签：</label>
          <input
            id="tags"
            placeholder="视频标签，请使用英文逗号分隔"
            v-model="editObject.tags"
          />
        </form>
        <div class="button-bar">
          <button class="btn-primary" @click="submit">提交</button>
          <button class="btn-primary-plain" @click="cancel">取消</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { VideoApi, UserApi, ImagesApi } from '@/api'
import { Confirm, Message, Upload } from '@/components/common'
import VideoCard, { VideoData } from '@/components/VideoCard.vue'
export default defineComponent({
  name: 'ManageVideo',
  components: {
    VideoCard,
    Upload
  },
  setup () {
    const userId = Number(window.localStorage.getItem('userId'))
    const videoList = ref([])
    const getVideoList = async () => {
      try {
        if (userId === 0) return
        const { data: userInfo } = await UserApi.getUserInfoById(userId)
        const { data: list } = await VideoApi.getVideoList(0, userInfo.postVideo)
        videoList.value = list
      } catch {}
    }

    const editObject = ref({
      id: -1,
      title: '',
      cover: '',
      summary: '',
      tags: ''
    })
    const isEdit = ref(false)
    const coverImg = ref()
    const cache = ref()
    const handleClickEdit = async (videoData: VideoData) => {
      isEdit.value = true
      const { id, title, cover, summary, tags } = videoData
      editObject.value.id = id
      editObject.value.title = title
      editObject.value.cover = cover
      editObject.value.summary = summary
      editObject.value.tags = tags
      coverImg.value = await ImagesApi.getImage(cover)
      cache.value = coverImg.value
    }
    const coverBuffer = ref()
    const handleChoose = (buffer: ArrayBuffer) => {
      coverBuffer.value = buffer
      coverImg.value = URL.createObjectURL(new Blob([buffer]))
    }
    const handleDeleteChoose = () => {
      coverBuffer.value = null
      coverImg.value = cache.value
    }
    const handleClickDelete = (videoData: VideoData) => {
      Confirm('是否确定删除视频', async (isConfirm: boolean) => {
        if (!isConfirm) return
        try {
          const { msg } = await VideoApi.deleteVideo(videoData.id)
          Message.success(msg)
          getVideoList()
        } catch {}
      })
    }

    const submit = async () => {
      try {
        if (coverBuffer.value instanceof ArrayBuffer) {
          const { data: img } = await ImagesApi.postImage(coverBuffer.value)
          editObject.value.cover = img.fileHash
        }
        const { msg } = await VideoApi.updateVideo(editObject.value)
        Message.success(msg)
        cancel()
        getVideoList()
      } catch {}
    }

    const cancel = () => {
      isEdit.value = false
      coverBuffer.value = null
      coverImg.value = cache.value
    }

    return {
      videoList,
      getVideoList,
      editObject,
      isEdit,
      coverImg,
      handleClickEdit,
      handleChoose,
      handleDeleteChoose,
      handleClickDelete,
      submit,
      cancel
    }
  }
})
</script>

<style lang="scss" scoped>
input, textarea {
  margin: .6rem 0;
}
textarea {
  height: 5rem;
  resize: none;
}
img {
  height: 6rem;
  width: 10rem;
  margin-bottom: .4rem;
}
.button-bar {
  display: flex;
  justify-content: flex-end;
  button { margin-left: .4rem; }
}
</style>
