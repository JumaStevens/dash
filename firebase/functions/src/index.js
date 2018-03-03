import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as MemberCreate from './db/messenger/members/create.f'

admin.initializeApp(functions.config().firebase)

export const memberCreate = MemberCreate.handler
