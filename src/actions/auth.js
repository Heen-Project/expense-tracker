import { firebase, googleAuthProvider } from '../firebase/firebase'
import { actionMode } from '../utils/auth'

const login = (uid) => ({
    type: actionMode.LOGIN,
    uid
})

const logout = () => ({
    type: actionMode.LOGOUT
})

const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider)
    }
}

const startLogout = () => {
    return () => {
        return firebase.auth().signOut()
    }
}

export { login, logout, startLogin, startLogout }