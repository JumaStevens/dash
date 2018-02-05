import IndexView from '~/views/IndexView.vue'
import AuthView from '~/views/AuthView.vue'
import ChatView from '~/views/ChatView.vue'
import FriendsView from '~/views/FriendsView.vue'
import AccountView from '~/views/AccountView.vue'

export const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexView
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatView,
    children: [
      {
        path: ':id',
        name: 'chat',
        component: ChatView
      }
    ]
  },
  {
    path: '/friends',
    name: 'friends',
    component: FriendsView
  },
  {
    path: '/account',
    name: 'account',
    component: AccountView
  }
]
