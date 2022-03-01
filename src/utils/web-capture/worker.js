class WebCapture {
  constructor () {
    this.isMKDIR = false
    this.cCapture = null
  }

  _getImageInfo (imgDataPtr) {
    const width = Module.HEAPU32[imgDataPtr / 4]
    const height = Module.HEAPU32[imgDataPtr / 4 + 1]
    const duration = Module.HEAPU32[imgDataPtr / 4 + 2]
    const imageBufferPtr = Module.HEAPU32[imgDataPtr / 4 + 3]
    const imageBuffer = Module.HEAPU8.slice(imageBufferPtr, imageBufferPtr + width * height * 3)

    Module._free(imgDataPtr)
    Module._free(imageBufferPtr)

    const imageDataBuffer = new Uint8ClampedArray(width * height * 4)
    let j = 0
    for (let i = 0; i < imageBuffer.length; i++) {
      if (i && i % 3 === 0) {
        imageDataBuffer[j] = 255
        j += 1
      }
      imageDataBuffer[j] = imageBuffer[i]
      j += 1
    }
    return {
      width,
      height,
      duration,
      imageDataBuffer
    }
  }

  capture ({ file, timeStamp }) {
    const MOUNT_DIR = '/working'
    if (!this.isMKDIR) {
      FS.mkdir(MOUNT_DIR)
      this.isMKDIR = true
    }
    FS.mount(WORKERFS, { files: [file] }, MOUNT_DIR);
    if (!this.cCapture) {
      this.cCapture = Module.cwrap('capture', 'number', ['number', 'string'])
    }
    const imgDataPtr = this.cCapture(timeStamp, `${MOUNT_DIR}/${file.name}`)
    FS.unmount(MOUNT_DIR)
    const evt = {
      type: 'capture',
      data: this._getImageInfo(imgDataPtr)
    }
    self.postMessage(evt, [evt.data.imageDataBuffer.buffer]);
  }
}

const webCapture = new WebCapture()

let isInit = false

self.onmessage = function (evt) {
  const evtData = evt.data
  if (isInit && webCapture[evtData.type]) {
    webCapture[evtData.type](evtData.data)
  }
}

self.Module = {
  instantiateWasm: (info, receiveInstance) => {
    const binaryString = self.atob(WASM_STRING)
    var len = binaryString.length
    var bytes = new Uint8Array(len)
    for (var i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    WebAssembly.instantiate(bytes, info).then(result => {
      receiveInstance(result.instance)
    })
  },
  onRuntimeInitialized: () => {
    isInit = true
    self.postMessage({ type: 'init', data: {} })
  }
}
