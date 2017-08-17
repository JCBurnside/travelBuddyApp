import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';

import Trip from '../models/trip';
import { TripsService } from '../services/trips.service';
import { FirebaseService } from '../services/auth.service';
import { ImageService } from '../services/image.service';
import { Router } from '@angular/router';
import { ReversePipe } from '../reverse.pipe';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  private newTrip = new Trip(null, null);
  public trips: any[] = [];
  private img: String;
  private id: string;
  @ViewChild('imgInput') el: ElementRef;
  constructor(public router: Router, public ts: TripsService, public as: FirebaseService, private is: ImageService) {
    as.getId(id => this.id = id);
    ts.getAllTrips((trips, err) => {
      if (err) {
        return console.log(err);
      }
      trips.forEach(trip => {
        let s: string = trip.Destinations.toString();
        let dest = s.split(','), city = dest[0], state = dest[1], country = dest[2];
        this.trips.push({ ...trip, city: city, state: state, country: country });
      });
    });
  }
  onChange() {
    console.log(this.newTrip.Destinations);
  }
  onClickProfile(id) {
    this.router.navigate(['/profile', id]);
  }
  onClickView($key) {
    this.router.navigate(['/trip-view', $key]);
  }
  // onClickDelete(trip) {
  //   this.ts.deleteTrip(trip, trip.$key, (success, err) => {
  //     console.log(success || err);
  //     this.trips.remove(trip);
  //   })
  // }
  ngOnInit() {
  }

}
