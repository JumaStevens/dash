import firebase, { firebaseRef } from './index'

const usersRef = firebaseRef.child('users')

export { usersRef }
