import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseListObservable } from 'angularfire2/database';

import Trip from '../models/trip';
import { TripsService } from '../services/trips.service';
import { ProfileService } from '../services/profile.service';
import { FirebaseService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector   : 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls  : ['./trip-view.component.css']
})
export class TripViewComponent implements OnInit {

  public name;
  public id;
  public sub     : any;
  public tripview: Trip = new Trip("", "");
  public PID     : string;                   //profile ID
  constructor(
    private router: Router,
    private route : ActivatedRoute,
    public  ts    : TripsService,
    public  ps    : ProfileService,
    public  as    : FirebaseService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.ts.getTripById(params['id'], (tripview: Trip) => {
        this.tripview = tripview;
        if(!tripview)
          this.router.navigateByUrl('/homepage')
      });
      this.id = params['id'];
    });
    this.ps.getProfileByOwner(this.tripview.Owner, (profile, err) => {
      if (err) {
        console.log(err);
        this.as.getId(id=>this.router.navigateByUrl(`/profile/${id}`))
      } else {
        this.name = profile.Name;
        this.PID  = profile.ownerID;
      }
    });
  }
  goToProfile() {
    this.router.navigateByUrl(`/profile/${this.PID}`);
  }
  getTransImg(mode) {
    switch (mode) {
      case 'Boat': 
        return './assets/img/boat.png';
      case 'Car': 
        return './assets/img/car.png';
      case 'Plane': 
        return './assets/img/plane.png';
      case 'Train': 
        return './assets/img/train.png';
    }
  }
}
