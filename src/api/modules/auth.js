import firebase from 'firebase';

const auth = {
  signup({email, password}) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  },
  signin({email, password}) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  },
  signout() {
    return firebase.auth().signOut()
  }
}

export {
  auth
}
