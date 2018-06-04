import {db} from './firebase';

//api 

export const doCreateUser = (id, username, email) =>
    db.ref(`users/${id}`).set({
        username,
        email,
    })

export const onceGetUsers = () =>
    db.ref('users').once('value');