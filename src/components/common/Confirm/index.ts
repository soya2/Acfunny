import { createApp } from 'vue'
import Confirm from './Confirm.vue'

export default function createInstance (
  message: string,
  Callback: CallableFunction = () => null
): void {
  const node = document.createElement('div')
  node.setAttribute('class', 'confirm-component')
  node.style.top = Math.ceil(document.documentElement.scrollTop) + 'px'
  document.documentElement.style.overflowY = 'hidden'

  const app = createApp(Confirm, {
    message,
    remove (isConfirm: boolean) {
      app.unmount()
      document.body.removeChild(node)
      document.documentElement.style.overflowY = ''
      Callback(isConfirm)
    }
  })
  app.mount(node)
  document.body.appendChild(node)
}
