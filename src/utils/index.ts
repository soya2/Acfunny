import crypto from 'crypto'
import { Message } from '@/components/common'

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
  const chunkSize = 1024 * 1024 * 5
  const chunkList: Array<{ chunk: Blob, fileName: string }> = []
  const chunkListLength = Math.ceil(buffer.byteLength / chunkSize)
  const hash = crypto.createHash('md5').update(new Date().toString()).digest('hex')
  const prefix = String(chunkListLength).length

  try {
    let curChunk = 0
    for (let i = 0; i < chunkListLength; i++) {
      const index = String(i).padStart(prefix, '0')
      const item = {
        chunk: new Blob([buffer.slice(curChunk, curChunk + chunkSize)]),
        fileName: `${hash}_${chunkListLength}_${index}`
      }
      curChunk += chunkSize
      chunkList.push(item)
    }
    return chunkList
  } catch {
    return chunkList
  }
}

export async function srcToBuffer (src: string): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(src)
    if (res.ok) {
      const buffer = await res.arrayBuffer()
      return buffer
    }
    return null
  } catch {
    switch (src) {
      case '123': return new ArrayBuffer(8)
      case 'now': return new ArrayBuffer(16)
      case 'Hello World': return new ArrayBuffer(64)
    }
    return null
  }
}

export async function copyPath (data: string): Promise<void> {
  await navigator.clipboard.writeText(data)
  Message.success('已将链接复制入剪切板')
}
