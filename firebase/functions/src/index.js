import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as MemberCreate from './db/messenger/members/create'
import * as MessageCreate from './db/messenger/messages/create'

admin.initializeApp(functions.config().firebase)


export const memberCreate = MemberCreate.listener
export const messageCreate = MessageCreate.listener
