import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Router, CanActivate } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class FirebaseService implements CanActivate{
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
  signin(user: User,cb:(err?:any)=>void) {
    this.af.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        this.router.navigateByUrl('/');

      })
      .catch((e) => {
        cb(e);
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
    return new Promise<boolean>((resolve, reject) => {
      this.af.authState.subscribe((authState) => {
        console.warn(!!authState);
        resolve(!!authState);
      });
    });
  }
}
