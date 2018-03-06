import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as MemberCreate from './db/messenger/members/create'
import * as MessageCreate from './db/messenger/messages/create'
import * as MessageDelete from './db/messenger/messages/delete'


admin.initializeApp(functions.config().firebase)


export const memberCreate = MemberCreate.listener
export const messageCreate = MessageCreate.listener
export const messageDelete = MessageDelete.listener
