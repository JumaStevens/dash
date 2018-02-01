import * as firebase from 'firebase'
import { config } from './config'

firebase.initializeApp(config)

export const firebaseRef = firebase.database().ref()

export default firebase
