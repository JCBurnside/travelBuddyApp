import { Injectable } from '@angular/core';
import Trip from '../models/trip';

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { FirebaseService } from "./auth.service";

@Injectable()
export class TripsService {
  trips: FirebaseListObservable<any[]>;
  constructor(private db: AngularFireDatabase,private at:FirebaseService) {
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
    let trip_;
    delete trip.$key
      trip_= trip
      console.log(trip_);  
    
    this.trips.push(trip).then(a=>console.log(a),err=>console.log(err));
  }
  getAllTrips(): Trip[] {
   let out: Trip[] = new Array<Trip>();
    this.trips.forEach(item => {
   
      item.forEach(trip => out.push(trip));
    })
    
    return out;
    /*return this.trips.subscribe().then(function(snapshot){
      return snapshot.val();
    })*/
  }

  getTripsByOwner(owner: string){
   /* let out: Trip[] = new Array<Trip>();
    console.log("Get fucked");
    console.log(this.getAllTrips())
    this.getAllTrips().forEach(trip => {
        console.log(trip.Owner, owner);
        if(trip.Owner==owner){  
        out.push(trip);
      }
      console.log(trip);
      });*/
    
    return this.trips;
  }
  saveTrip(profile:Trip,id:String, cb: Function) {
      this.db.object('/trips/' + id).update(profile).then(() => cb(true)).catch(err => cb(false, err));
  }
}

