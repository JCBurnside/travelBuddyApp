import { Injectable } from '@angular/core';
import Trip from '../models/trip';

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";


@Injectable()
export class TripsService {
  trips: FirebaseListObservable<any[]>;
  constructor(db: AngularFireDatabase) {
    this.trips = db.list('trips');
  }
  getTripById(id: string, cb: Function): void {
    let trip: Trip;
    this.trips.forEach(_ => {
      cb(_.find(value => {
        console.log(value.$key == id);
        return value.$key == id;
      }));
    });
  }
  getAllTrips(): Trip[] {
    let out: Trip[] = new Array<Trip>();
    this.trips.forEach(item => {
      item.forEach(_ => out.push(_));
    })
    return out;
  }
}
