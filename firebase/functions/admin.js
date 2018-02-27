const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports = function() {
  return admin.initializeApp(functions.config().firebase);
}
