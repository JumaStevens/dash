const router = require('express').Router()
const admin = require('firebase-admin')

// firebase credentials
const config = {
  "type": process.env.FIREBASE_ADMIN_TYPE,
  "project_id": process.env.FIREBASE_ADMIN_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_ADMIN_PRIVATE_KEY,
  "client_email": process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_ADMIN_CLIENT_ID,
  "auth_uri": process.env.FIREBASE_ADMIN_AUTH_URI,
  "token_uri": process.env.FIREBASE_ADMIN_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL
}



// // initialize firebase
// admin.initializeApp({
//   credential: admin.credential.cert(config),
//   databaseURL: 'https://dash-2828.firebaseio.com'
// })

console.log('firebase: ', config)
// view at http://localhost:8080/api/db || http://www.dash.com/api/db
router.get('/db', function (req, res, next) {
  res.send('firebase!')
})

// export
module.exports = router
