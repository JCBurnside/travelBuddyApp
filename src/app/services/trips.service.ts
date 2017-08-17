import { Injectable } from '@angular/core';
import Trip from '../models/trip';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FirebaseService } from './auth.service';
import * as firebase from 'firebase/app';

@Injectable()
export class TripsService {
  trips: firebase.database.Reference;
  constructor(private db: AngularFireDatabase, private at: FirebaseService) {
    this.trips = db.database.ref('trips');
  }
  getTripById(id: string, cb: (trip: Trip) => void): void {
    this.db.object('/trips/' + id).subscribe((trip) => {
      delete trip.$value;
      cb(trip);
    });
  }

 getAllTrips(cb: (trips: Trip[], err: Error|string) => void) {
     this.trips
        .orderByChild('Time')
        .on('value', (snap, err) => {
            if(err)
                return cb(null,err);
            let out: Trip[] = [];
            Object.keys(snap.val()).forEach(trip => {
                out.push({...snap.val()[trip], $key: trip});
                return true;
            });
            out=out.reverse()
            cb(out, null);
        });
        cb(out, null);
      });
  }

  getTripsByOwner(owner: string, cb: (trips: Trip[], err: Error | string) => void) {
    this.trips
      .orderByChild('Owner')
      .equalTo(owner)
      .on('value', (snap, err) => {
        if (err) {
          return cb(null, err);
        }
        let out: Trip[] = [];
        console.log(snap.val());
        Object.keys(snap.val() || {}).forEach(key => {
          out.push({ ...snap.val()[key], $key: key });
        });
        cb(out, null);
      });
  }
  saveTrip(trip: Trip, cb: (tripSaved: Trip, err: Error|string) => void) {
    console.log(Date.now());
    if (trip.$key) {
        let saved = trip;
        let id = trip.$key;
        delete trip.$key;
        this.db.object('/trips/' + id).update({...trip,Time: Date.now()}).then(() =>{console.log("TRIP SAVED"); cb({...trip,$key:id},null)}).catch(err => cb(null, err));
    } else {
        delete trip.$key;
        this.trips.push({...trip,Time:Date.now()}).then(tripref =>{ cb({...trip, $key: tripref.key}, null)}).catch(err => cb(null, err));
    }
  }
  deleteTrip(trip: Trip, cb: Function) {
    if (trip.$key) {
      this.db.object('/trips/' + trip.$key).remove().then(success => cb(true, null)).catch(err => cb(false, err));
    }
  }
}
