import crypto from 'crypto'

export function dateParse (time: string): string {
  const date = new Date(time)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  const h = date.getHours()
  const mi = date.getMinutes()
  return `${y}-${m < 10 ? `0${m}` : m}-${d < 10 ? `0${d}` : d} ${h}:${mi < 10 ? `0${mi}` : mi}`
}

export function bufferSlice (buffer: ArrayBuffer): Array<{ chunk: Blob, fileName: string }> {
  const chunkSize = 1024 * 1024 * 2
  const chunkList = []
  const chunkListLength = Math.ceil(buffer.byteLength / chunkSize)
  const hash = crypto.createHash('md5').update(new Date().toString()).digest('hex')

  let curChunk = 0
  for (let i = 0; i < chunkListLength; i++) {
    const item = {
      chunk: new Blob([buffer.slice(curChunk, curChunk + chunkSize)]),
      fileName: `${hash}_${chunkListLength}_${i}`
    }
    curChunk += chunkSize
    chunkList.push(item)
  }
  return chunkList
}
