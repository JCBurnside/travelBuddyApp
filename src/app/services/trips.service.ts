import { Injectable } from '@angular/core';
import Trip from '../models/trip';

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { FirebaseService } from "./auth.service";

@Injectable()
export class TripsService {
  trips: FirebaseListObservable<any[]>;
  constructor(db: AngularFireDatabase,private at:FirebaseService) {
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
  addNewTrip(trip:Trip):void{
    this.trips.push(trip).then(a=>console.log(a),err=>console.log(err));
  }
  getAllTrips(): Trip[] {
    let out: Trip[] = new Array<Trip>();
    this.trips.forEach(item => {
      item.forEach(_ => out.push(_));
    })
    return out;
  }
}
