export default class User {
  constructor({
    dateCreated,
    dateLastSignedIn,
    email,
    displayName,
    emailVerified,
    phoneNumber,
    photoURL,
    uid,
  }) {
    this.displayName = displayName
    this.uid = uid
    this.photoURL = photoURL
    this.email = email
    this.emailVerified = emailVerified
    this.phoneNumber = phoneNumber
    this.dateCreated = dateCreated
    this.dateLastSignedIn = dateLastSignedIn
  }

  getUser() {
    return {
      dateCreated: this.dateCreated,
      dateLastSignedIn: this.dateLastSignedIn,
      email: this.email,
      displayName: this.displayName,
      emailVerified: this.emailVerified,
      phoneNumber: this.phoneNumber,
      photoURL: this.photoURL,
      uid: this.uid,
    }
  }
}
