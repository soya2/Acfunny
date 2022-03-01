<template>
  <div>
    <h3>创作中心</h3>
    <form>
      <label>视频：</label>
      <Upload
        ref="uploadRef"
        @handleChooseFile="chooseFile"
        @handleClickUpload="uploadFile"
        @handleClickDelete="deleteFile"
      />
      <label>封面：</label>
      <img class="cover" :src="coverSrc" />
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
        class="btn-primary"
        type="submit"
        @click="submit"
      >提交</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { bufferSlice, srcToBuffer } from '@/utils'
import { ImagesApi, VideoApi } from '@/api'
import { Confirm, Message, Upload } from '@/components/common'
export default defineComponent({
  name: 'CreateVideo',
  components: {
    Upload
  },
  setup () {
    const videoData = ref({
      title: '',
      summary: '',
      tags: ''
    })

    const uploadRef = ref()
    const fileHash = ref('')
    const coverSrc = ref()
    const coverBuffer = ref()
    const chooseFile = async (buffer: ArrayBuffer, raw: ArrayBuffer) => {
      const timeInput = 20;
      (window as any).webCapture.capture(raw, timeInput * 1000, async (dataURL: string) => {
        coverSrc.value = dataURL
        coverBuffer.value = await srcToBuffer(dataURL)
      })
    }

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
            fileHash.value = data.fileHash
            uploadRef.value.changeButtonIsHidden(true)
            Message.success(msg)
          }
        }
      } catch {}
    }

    const deleteFile = async () => {
      if (fileHash.value === '') return
      try {
        await VideoApi.deleteVideoFile(fileHash.value)
        fileHash.value = ''
      } catch {}
    }

    const submit = async () => {
      try {
        const { file } = uploadRef.value
        if (!file) return Message.error('请选择文件')
        if (fileHash.value.trim() === '') return Message.error('请上传视频')
        if (videoData.value.title.trim() === '') return Message.error('视频标题不能为空')
        const tagsArr = videoData.value.tags.split(',').filter(item => {
          if (item.trim() !== '') return item
        })
        let cover
        if (coverBuffer.value) {
          const { data } = await ImagesApi.postImage(coverBuffer.value)
          cover = data.fileHash
        } else cover = ''

        const { msg } = await VideoApi.uploadVideoInfo(
          videoData.value.title,
          videoData.value.summary,
          tagsArr,
          fileHash.value,
          cover
        )
        Message.success(msg)
        fileHash.value = ''
      } catch {}
    }

    const cancel = () => {
      if (fileHash.value === '') return
      return new Promise<void>((resolve, reject) => {
        Confirm('离开将删除已上传的视频\n是否确认离开', async (isConfirm: boolean) => {
          if (!isConfirm) return reject(new Error())
          uploadRef.value.handleDeleteChoose()
          resolve()
        })
      })
    }

    onBeforeRouteLeave(async (to) => {
      try {
        if (to.fullPath !== '/create') await cancel()
      } catch {
        return false
      }
    })

    return {
      videoData,
      uploadRef,
      coverSrc,
      chooseFile,
      uploadFile,
      deleteFile,
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
.button-bar {
  display: flex;
  justify-content: flex-end;
}
.cover {
  display: block;
  width: 12rem;
}
</style>
