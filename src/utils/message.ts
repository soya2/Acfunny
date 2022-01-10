import { App, createApp } from 'vue'
import Message from '@/components/Message/Message.vue'
interface MessageConfig {
  type: string;
  icon: string;
  content: string;
  close?: boolean;
  duration?: number;
}

const createInstance = (cfg: MessageConfig) => {
  const config = cfg || {}

  const messageNode = document.createElement('div')
  messageNode.setAttribute('class', 'message')
  const height = 54
  const messageList = document.getElementsByClassName('message')
  messageNode.style.width = '100%'
  messageNode.style.display = 'flex'
  messageNode.style.justifyContent = 'center'
  messageNode.style.top = `${messageList.length * height}px`
  messageNode.style.position = 'fixed'

  const app = createApp(Message, {
    config,
    remove () {
      app.unmount()
      document.body.removeChild(messageNode)
    }
  })
  app.mount(messageNode)
  document.body.appendChild(messageNode)

  return app
}

function renderMsg (typeCfg: MessageConfig) {
  const {
    type = 'text',
    content = '',
    icon = '',
    duration = 3000,
    close = false
  } = typeCfg

  return createInstance({
    type,
    content,
    duration,
    icon,
    close
  })
}

export default {
  info (msg = ''): App {
    const textCfg = {
      type: 'info',
      icon: '',
      content: msg
    }
    return renderMsg(textCfg)
  },
  success (msg = ''): App {
    const successCfg = {
      type: 'success',
      icon: 'ri-checkbox-circle-fill',
      content: msg
    }
    return renderMsg(successCfg)
  },
  error (msg = ''): App {
    const errorCfg = {
      type: 'error',
      icon: 'ri-close-circle-fill',
      content: msg
    }
    return renderMsg(errorCfg)
  }
}
