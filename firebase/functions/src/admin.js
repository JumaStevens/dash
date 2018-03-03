// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
//
// exports = () => admin.initializeApp(functions.config().firebase)

// initialize firebase app
import { config } from 'firebase-functions'
import admin from 'firebase-admin'

admin.initializeApp(config().firebase)

export const database = admin.database()

export * from 'firebase-functions'
