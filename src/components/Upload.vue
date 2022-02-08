<template>
  <div style="margin: .6rem 0;">
    <transition name="vertical">
      <div v-show="file !== undefined" class="choose">
        <div class="name">
          {{ fileName }}
          <span v-show="isHidden" class="tips">（已上传）</span>
        </div>
        <icon-button
          :button-object="{ id: 0, icon: 'times', tip: '删除' }"
          @handleClickIcon="handleDeleteChoose"
        />
      </div>
    </transition>
    <input
      ref="uploadRef"
      type="file"
      accept=".mp4"
      style="display:none"
      @change="handleInputChange"
    />
    <button
      v-show="!isHidden"
      class="btn-primary"
      type="button"
      @click="clickButton"
    >选择文件</button>
    <button
      v-show="(!isHidden) && uploadButtonVisible"
      class="btn-primary"
      style="margin-left: .4rem"
      type="button"
      @click="handleClickUpload"
    >上传</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import IconButton from '@/components/IconButton/IconButton.vue'
export default defineComponent({
  name: 'Upload',
  components: {
    IconButton
  },
  emits: ['handleClickUpload', 'handleClickDelete'],
  setup (props, context) {
    const file = ref()
    const fileName = ref('')
    const uploadRef = ref()
    const isHidden = ref(false)
    const uploadButtonVisible = ref(false)
    const clickButton = () => {
      uploadRef.value.click()
    }

    const handleInputChange = async (event: Event) => {
      const files = (event.target as HTMLInputElement).files
      const chooseFile = files && files[0]
      if (chooseFile) {
        fileName.value = chooseFile.name
        uploadButtonVisible.value = true
        file.value = await chooseFile?.arrayBuffer()
      }
    }

    const handleDeleteChoose = () => {
      file.value = undefined
      fileName.value = ''
      uploadRef.value.value = ''
      uploadButtonVisible.value = false
      isHidden.value = false
      context.emit('handleClickDelete')
    }

    const handleClickUpload = () => {
      context.emit('handleClickUpload', file.value)
    }

    const changeButtonIsHidden = (state: boolean) => {
      isHidden.value = state
    }

    return {
      file,
      uploadRef,
      fileName,
      clickButton,
      isHidden,
      uploadButtonVisible,
      handleInputChange,
      handleDeleteChoose,
      handleClickUpload,
      changeButtonIsHidden
    }
  }
})
</script>

<style lang="scss" scoped>
.choose {
  display: flex;
  justify-content: space-between;
  margin-bottom: .4rem;
  transition: .2s;
  &:hover {
    color: red;
  }
  .name {
    width: 75%;
    margin: auto 0;
    font-weight: bold;
    font-size: .6rem;
    cursor: pointer;
    .tips {
      font-weight: normal;
      color: gray;
    }
  }
}
.upload {
  width: fit-content;
  cursor: pointer;
  input {
    opacity: 0;
  }
}
</style>
