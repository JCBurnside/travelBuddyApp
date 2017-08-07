import { Injectable } from '@angular/core';
import Trip from '../models/trip';

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";


@Injectable()
export class TripsService {
  trips: FirebaseListObservable<Trip[]>;
  constructor(db: AngularFireDatabase) {
    this.trips=db.list('trips');
  }
  
}
