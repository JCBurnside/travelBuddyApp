import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { Observable, Subscription } from 'rxjs/Rx';
import Trip from '../models/trip';
import { TripsService } from '../services/trips.service';
import { FirebaseService } from '../services/auth.service';
import { ImageService } from '../services/image.service';
import { ProfileService } from "../services/profile.service";
import { Router } from '@angular/router';
import { ReversePipe } from '../reverse.pipe';

@Component({
  selector   : 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls  : ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {
  public     trips         : any[] = [];
  private    id            : string;
  public     maxHeight     : number;
  private    sub           : Subscription;
  @ViewChild('imgInput') el: ElementRef;
  constructor(public router: Router, public ts: TripsService, public as: FirebaseService, private is: ImageService, private ps: ProfileService) {
    as.getId(id => this.id = id);
    ts.getAllTrips((trips, err) => {
      if (err) {
        return console.log(err);
      }
      trips.forEach(trip => {
        let s: string = trip.Destinations.toString();
        let dest      = s.split(','), city = dest[0], state = dest[1], country = dest[2];
        console.log(country);
        if(!country||/^ [^a-zA-Z]$/.test(country)){
          country=state;
          state=undefined;
        }
        ps.getProfileByOwner(trip.Owner, (p, e) => {
          if (p) {
            this.trips.push({ ...trip, city: city, state: state, country: country, OwnerFB: p.Facebook });
          } else {
            this.trips.push({ ...trip, city: city, state: state, country: country, OwnerFB: undefined });
          }
        });
      });
    });
  }
  onClickProfile(id) {
    this.router.navigateByUrl(`/profile/${id}`);
  }
  onClickView($key) {
    this.router.navigateByUrl(`/trip-view/${$key}`);
  }
  ngOnInit() {
    this.sub = Observable.timer(0, 0).subscribe(() => {
      let tripsList = document.getElementById('tripsCon').querySelectorAll("figcaption");
      for (let ctr = 0; ctr < tripsList.length; ctr++) {
        this.maxHeight = Math.max(this.maxHeight || 0, tripsList[ctr].clientHeight);
      }
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
