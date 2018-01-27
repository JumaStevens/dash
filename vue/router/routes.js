import IndexView from '../views/IndexView.vue'
import AuthView from '../views/AuthView.vue'
import ChatView from '../views/ChatView.vue'

export const routes = [
  { path: '', component: IndexView },
  { path: '/auth', component: AuthView },
  { path: '/chat', component: ChatView }
]
