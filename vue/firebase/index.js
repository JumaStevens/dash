import firebase from 'firebase'
import { config } from './config'

firebase.initializeApp(config)

export const firebaseRef = firebase.database().ref()

export const chatRef = firebaseRef.child('chat')

export default firebase
