import { Injectable } from '@angular/core';
import Trip from '../models/trip';

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { FirebaseService } from "./auth.service";

@Injectable()
export class TripsService {
  trips: FirebaseListObservable<any[]>;
  constructor(private db: AngularFireDatabase, private at: FirebaseService) {
    this.trips = db.list('trips');
    
  }
  getTripById(id: string, cb: Function): void {
    let trip: Trip;
    this.trips.forEach(_ => {
      cb(_.find(value => {
        return value.$key == id;
      }));
    });
  }

  addNewTrip(trip: Trip,cb:(key:String,err?:Error)=>void): void {
    delete trip.$key
    this.trips.push(trip)
    .then(something =>{ 
      let s:String=new String(something);
      cb(s.substr(s.lastIndexOf('/')+1));
    }).catch( err =>{console.log(err);cb(null,err)});

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

  getTripsByOwner(owner: string) {
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
  saveTrip(trip:Trip,id:String, cb: Function) {
      this.db.object('/trips/' + id).update(trip).then(() => cb(true)).catch(err => cb(false, err));
  }
  deleteTrip(trip:Trip,id:string,cb:Function){
    this.db.object('/trips/'+id).remove().then(success=>cb(success,null)).catch(err=>cb(false,err));
  }
}

