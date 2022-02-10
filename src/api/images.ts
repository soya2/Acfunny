import { Api, ResType, Request } from '@/utils/request'
import { Get, Loading, loginRequired } from '@/utils/decorators'
import crypto from 'crypto'

class ImagesApi extends Api {
  getBase (): string {
    return 'images'
  }

  @Get('')
  async getImageByHash (imgHash: string): ResType {
    return { imgHash }
  }

  async getImage (imgHash: string) {
    const { data: buffer } = await this.getImageByHash(imgHash)
    if (!buffer) return ''
    return URL.createObjectURL(new Blob([new Int8Array(buffer.data)]))
  }

  @loginRequired()
  @Loading()
  async postImage (buffer: ArrayBuffer): ResType {
    const formData = new FormData()
    const hash = crypto.createHash('md5').update(new Date().toString()).digest('hex')
    formData.append('chunk', new Blob([buffer]))
    formData.append('hash', hash)
    return Request.axiosInstance({
      url: 'images/upload',
      method: 'post',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData
    })
  }

  @loginRequired()
  @Loading()
  @Get('delete')
  async deleteImage (hash: string): ResType {
    return { hash }
  }
}

export default new ImagesApi()
