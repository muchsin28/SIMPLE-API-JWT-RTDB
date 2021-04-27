const admin = require("firebase-admin");
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.db_URL,
});

const database = admin.database();

module.exports = database;
