import * as admin from 'firebase-admin';

const prodServiceAccount = require(`./${process.env.SECRET_KEY_FILE_PATH}`);

export default function initFirebase(){
    admin.initializeApp({
    credential: admin.credential.cert(prodServiceAccount)
    });
}
