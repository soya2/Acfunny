<template>
  <div class="create-container">
    <Aside />
    <div class="base-container create-main">
      <h3>创作中心</h3>
      <form>
        <label>视频：</label>
        <Upload
          ref="uploadRef"
          @handleClickUpload="uploadFile"
        />
        <label for="title">视频标题：</label>
        <input
          id="title"
          required
          v-model="videoData.title"
          placeholder="视频标题"
        />
        <label for="summary">视频简介：</label>
        <textarea
          id="summary"
          v-model="videoData.summary"
          placeholder="视频简介"
        />
        <label for="tags">视频标签：</label>
        <input
          id="tags"
          v-model="videoData.tags"
          placeholder="视频标签，请使用英文逗号分隔"
        />
      </form>
      <div class="button-bar">
        <button
          class="btn-primary-plain"
          type="submit"
          @click="$router.go(-1)"
        >取消</button>
        <button
          class="btn-primary"
          type="submit"
          @click="submit"
        >提交</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Aside from './components/Aside.vue'
import Upload from '@/components/Upload.vue'
import Message from '@/utils/message'
import VideoApi from '@/api/video'
import { bufferSlice } from '@/utils/index'
export default defineComponent({
  name: 'Create',
  components: {
    Aside,
    Upload
  },
  setup () {
    const videoData = ref({
      title: '',
      summary: '',
      tags: ''
    })

    const uploadRef = ref()
    const uploadFile = async (buffer: ArrayBuffer) => {
      const bufferList = bufferSlice(buffer)
      const requestList: CallableFunction[] = []
      bufferList.forEach(item => {
        const fn = async () => {
          const formData = new FormData()
          formData.append('chunk', item.chunk)
          formData.append('filename', item.fileName)
          return await VideoApi.uploadVideoStream(formData)
        }
        requestList.push(fn)
      })
      try {
        for await (const req of requestList) {
          const { data, msg } = await req()
          if (data && data.fileHash) {
            console.log(data.fileHash)
            Message.success(msg)
          }
        }
      } catch {}
    }
    const submit = async () => {
      const { file } = uploadRef.value
      if (!file) return Message.error('请选择文件')
      if (videoData.value.title.trim() === '') {
        return Message.error('视频标题不能为空')
      }
      const tagsArr = videoData.value.tags.split(',').filter(item => {
        if (item.trim() !== '') return item
      })
      const { msg } = await VideoApi.uploadVideoInfo(
        videoData.value.title,
        videoData.value.summary,
        tagsArr
      )
      Message.success(msg)
    }

    return {
      videoData,
      uploadRef,
      uploadFile,
      submit
    }
  }
})
</script>

<style lang="scss" scoped>
.create-container {
  margin: 1rem 0;
  display: flex;
  justify-content: center;
}
.create-main {
  width: 40%;
  margin-left: 1rem;
  input, textarea {
    margin: .6rem 0;
  }
  textarea {
    height: 5rem;
    resize: none;
  }
  .button-bar {
    display: flex;
    justify-content: flex-end;
    button {
      margin-left: .6rem;
    }
  }
}
</style>
