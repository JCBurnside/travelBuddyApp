import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import Profile from '../models/profile';
import Trip from '../models/trip';
import { FirebaseApp, AngularFireModule } from 'angularfire2';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class ImageService {
  private ProfileImages: firebase.storage.Reference;
  private TripImages: firebase.storage.Reference;
  private Storage: firebase.storage.Storage;
  constructor(private db: FirebaseApp, private test: AngularFireModule) {
    this.Storage = db.storage();
    this.ProfileImages = db.storage().ref('/profileImg/');  // reference to the profile images
    this.TripImages = db.storage().ref('/tripImg/');        // reference to the trips images
  }
  uploadProfile(img: any, p: Profile, cb?: (snapshot: firebase.storage.UploadTaskSnapshot, err?: Error) => null | void) {

    this.Storage.ref('/profileImg/' + p.$key).put(img).then((snap) => { // snap is a snapshot
      if (cb) {
        cb(snap, null);
      }
    }).catch(err => {
      if (cb)
        cb(null, err);
    });
  }
  // uploadTrip(img:any,t:Trip,cb?:(snapshot:firebase.storage.UploadTaskSnapshot,err?:Error)=>null|void){
  //   this.Storage.ref('/tripsImg/'+t.$key).put(img).then((snap)=>{//see above
  //     if(cb){
  //       cb(snap,null);
  //     }
  //   }).catch(err=>{
  //     if(cb)
  //       cb(null,err);
  //   });
  // }
  uploadTrip(img: any, t: String, cb?: (snapshot: firebase.storage.UploadTaskSnapshot, err?: Error) => null | void) {
    this.Storage.ref('/tripsImg/' + t).put(img).then((snap) => { // see above
      if (cb) {
        console.log('image saved to storage');
        cb(snap, null);
      }
    }).catch(err => {
      if (cb) {
        console.log('image was not saved to db');
        cb(null, err);
      }
    });
  }

}
