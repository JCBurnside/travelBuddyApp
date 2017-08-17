import { Injectable } from '@angular/core';
import { User } from '../models/user';

import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
<<<<<<< Updated upstream
export class FirebaseService {
=======
export class FirebaseService implements CanActivate {
>>>>>>> Stashed changes
  authState;
  user;
  getId(cb: (id: string) => void) {
    this.canActivate().then(() => {
      cb(this.af.auth.currentUser.uid);
    });
  }
  signup(user: User) {
    this.af.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then((a) => {
        this.getId((id) => {
          this.router.navigate(['/profile-edit', id]);
        });
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(this.isAuthed());
  }
<<<<<<< Updated upstream
  signin(user: User) {
=======
  signin(user: User, cb: (err?: any) => void) {
>>>>>>> Stashed changes
    this.af.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        this.router.navigateByUrl('/');

      })
      .catch((e) => {
        console.log(e);
      });
  }
  isAuthed() {
    return !!this.authState;
  }
  currentUser() {
    return this.af.auth.currentUser;
  }
  constructor(private af: AngularFireAuth, private router: Router) {
    this.af.authState.subscribe((authState) => {
      this.authState = authState;
    });
  }
  signout() {
    this.af.auth.signOut();
  }
  canActivate() {
    return new Promise((resolve, reject) => {
      this.af.authState.subscribe((authState) => {
        console.warn(!!authState);
        resolve(!!authState);
      });
    });
  }
}
