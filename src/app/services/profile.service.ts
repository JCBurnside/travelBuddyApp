import { Injectable } from '@angular/core';
import Profile from '../models/profile';
import { Interests } from '../models/interests';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'firebase/database';

@Injectable()

export class ProfileService {

  profiles: firebase.database.Reference;

  constructor(public db: AngularFireDatabase) {
    this.profiles = db.database.ref('profiles');

  }
  /*
  *@params id is the string of the user UID whose profile you are getting
  *@params cb is a void callback function that takes a Profile and Error or string as arguments
  */
  getProfileByOwner(id: string, cb: (profile: Profile, err: Error | string) => void) {
    if(!id) return cb(null, "No profile id");
    this.profiles.orderByChild('ownerID').equalTo(id).on('value', (snap, err) => {
      if (snap.val()) {
        let key                  = Object.keys(snap.val())[0];
        let profile              = snap.val()[key];
        let interests: Interests = Interests.convertToInterest(profile.Interest || new Interests());
        cb({ ...profile, Interest: interests, $key: key }, null);
      } else {
        cb(new Profile(id, ''), err);
      }
    });
  }
  /*
  * id is a string of the id of the profile you trying to get
  * cb is a subscribe function that takes a Profile as an argument
  */
  getProfileById(id: string, cb: (profile: Profile) => void): void {
    this.db.object('/profiles/' + id).subscribe(profile => {
      delete profile.$value;
      let interests: Interests = Interests.convertToInterest(profile.Interest);
      console.log(profile.Interest);
      cb({ ...profile, Interest: interests });
    });
  }

  /*
  * cb is a callback function that takes a Profile[] as an argument
  */
  getAllProfiles(cb: (profiles: Profile[], err: Error | String) => void) {
    console.log('SENDERING REQUEST');
    this.profiles.on('value', (snap, err) => {
      if (err) {
        console.log('ERRORED');
        cb(null, err);
      } else {
        console.log('SUCCESS');
        let out: Profile[] = [];
        snap.forEach(item => { out.push(item.exportVal()); return true; });
        cb(out, err);
      }
    });
    console.log('REQUEST SENT');
  }
  /*
  * profile is the Profile object to be saved/updated
  * cb is the callback of what to do arguments are (success,error)
  */
  saveProfile(profile: Profile, cb: (success: boolean, err?: Error | string) => void) {
    delete profile.Interest.toStringArray;
    if (profile.$key) {
      var id = profile.$key;
      delete profile.$key;
      this.db.object('/profiles/' + id).update(profile).then(() => cb(true)).catch(err => cb(false, err));
    } else {
      delete profile.$key;
      this.profiles.push(profile).then(() => cb(true)).catch(err => cb(false, err));
    }
  }
}

