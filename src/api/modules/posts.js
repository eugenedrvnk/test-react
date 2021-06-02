import firebase from 'firebase';

const posts = {
  async get(id) {
    const db = firebase.firestore()

    if (id === undefined) {
      const postsSnapshot = await db.collection('posts').orderBy('id', 'desc').get()
      return postsSnapshot.docs.map(doc => doc.data())
    }
  },
  create({title, desc, image}) {
    const db = firebase.firestore()
    return db.collection("posts").add({
      title,
      desc,
      image,
      id: +new Date()
    })
  },
  delete(id) {
    const db = firebase.firestore()
    return db.collection('posts').where('id', '==', id).get().then(res => {
      res.docs.forEach(doc => doc.ref.delete())
    })
  }
}

export {
  posts
}
