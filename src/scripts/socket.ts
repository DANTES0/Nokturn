import { io, Socket } from 'socket.io-client'
import { config } from '@/scripts/config'

let socket: Socket | null = null

export function getSocket() {
  if (!socket) {
    socket = io(config.url, { transports: ['websocket'] })
  }
  return socket
}

export function disconnectSocket() {
  if (socket) {
    socket.removeAllListeners()
    socket.disconnect()
    socket = null
  }
}
