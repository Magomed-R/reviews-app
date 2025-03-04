import { useReviewStore } from '@/stores/counter'
import type { Store } from 'pinia'
import { io as createIO } from 'socket.io-client'
import { onMounted } from 'vue'

export const io = createIO(import.meta.env.VITE_BASE_URL, {
  path: '/socket'
})

io.connect()

export type Events =
  | 'error'
  | 'review:created'
  | 'review:updated'
  | 'review:swaped'
  | 'review:deleted'

io.on('error', (error) => {
  console.log(error)
})
