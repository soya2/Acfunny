import { dateParse, bufferSlice, srcToBuffer } from '../src/utils/index'

describe('日期转换工具测试', () => {
  test('dataParse 1', () => {
    expect(dateParse('2022-03-01 13:00')).toBe('2022-03-01 13:00')
  })
  test('dataParse 2', () => {
    expect(dateParse('2022-03-01')).toBe('2022-03-01 8:00')
  })
  test('dataParse 3', () => {
    expect(dateParse('Sun Mar 01 2022 13:00:00 GMT+0800 (中国标准时间)')).toBe('2022-03-01 13:00')
  })
  test('dataParse 4', () => {
    expect(dateParse(String(new Date('2022-03-01 13:00')))).toBe('2022-03-01 13:00')
  })
})

describe('缓存切片工具测试', () => {
  const buffer = new ArrayBuffer(1024)
  const view = new DataView(buffer)
  view.setInt8(4, 256)
  // jest no support Blob;
  test('bufferSlice 1', () => {
    expect(bufferSlice(buffer)).toStrictEqual([])
  })
  test('bufferSlice 2', () => {
    expect(bufferSlice(buffer)).toStrictEqual([])
  })
  test('bufferSlice 3', () => {
    expect(bufferSlice(buffer)).toStrictEqual([])
  })
})

describe('二进制转buffer工具测试', () => {
  // jest no support fetch;
  test('srcToBuffer 1', async () => {
    const data = await srcToBuffer('123')
    expect(data?.byteLength).toBe(8)
  })
  test('srcToBuffer 2', async () => {
    const data = await srcToBuffer('now')
    expect(data?.byteLength).toBe(16)
  })
  test('srcToBuffer 3', async () => {
    const data = await srcToBuffer('Hello World')
    expect(data?.byteLength).toBe(64)
  })
})
