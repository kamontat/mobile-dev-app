import * as firebase from 'firebase'
firebase.initializeApp(require("./cert.json").firebase);

const database = firebase.database()

export default DatabaseApi = {
    getLatest: async function () {
        // const snapshot = await firebase.database().ref('/users').once('value')
        return await firebase.database().ref('/users')
    },
    write: async function (json) {
        const snapshot = await firebase.database().ref('/users').once('value')
        const unique = await snapshot.val().length
        return await firebase.database().ref(`/users/${unique}`).set({
            id: json.id,
            name: json.name,
            email: json.email,
            picture: json.picture,
        });
    }
}
