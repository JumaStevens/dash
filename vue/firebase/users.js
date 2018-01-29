import firebase, { firebaseRef } from './index'

const userRef = firebaseRef.child('users')

export { userRef, initializeAuth }
