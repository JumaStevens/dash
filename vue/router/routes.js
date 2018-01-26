import IndexView from '../views/IndexView.vue'
import ChatView from '../views/ChatView.vue'

export const routes = [
  { path: '', component: IndexView },
  { path: '/chat', component: ChatView }
]
