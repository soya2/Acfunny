import { createApp, App } from 'vue'
import Loading from './Loading.vue'

let INSTANCE: App | null
let NODE: HTMLDivElement | null
const removeFn = (): void => {
  if (!(INSTANCE || NODE)) return
  try {
    (INSTANCE as App).unmount()
    document.body.removeChild(NODE as HTMLDivElement)
    document.documentElement.style.overflowY = ''
  } catch {}
  INSTANCE = null
  NODE = null
}

function createInstance (
  duration: number,
  message: string
): { app: App, node: HTMLDivElement } {
  const node = document.createElement('div')
  node.setAttribute('class', 'confirm-component')
  node.style.top = Math.ceil(document.documentElement.scrollTop) + 'px'
  document.documentElement.style.overflowY = 'hidden'

  const app = createApp(Loading, {
    duration,
    message,
    remove: removeFn
  })
  app.mount(node)
  document.body.appendChild(node)

  return {
    app,
    node
  }
}

export default {
  start (duration: number, msg: string): void {
    if (INSTANCE || NODE) return
    const temp = createInstance(duration, msg)
    INSTANCE = temp.app
    NODE = temp.node
  },

  stop (): void {
    setTimeout(removeFn, 200)
  }
}
