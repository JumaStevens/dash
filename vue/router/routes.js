import Index from '~/views/Index.vue'
import Auth from '~/views/Auth.vue'
import Chat from '~/views/Chat.vue'
import Friends from '~/views/Friends.vue'
import Account from '~/views/Account.vue'

export const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth
  },
  {
    path: '/chat',
    name: 'chat',
    component: Chat,
    children: [
      {
        path: ':id',
        name: 'chatId',
        component: Chat
      }
    ]
  },
  {
    path: '/friends',
    name: 'friends',
    component: Friends
  },
  {
    path: '/account',
    name: 'account',
    component: Account
  }
]
