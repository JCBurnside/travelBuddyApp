import Profile from '../models/profile';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { TripsService } from '../services/trips.service';
import { FirebaseService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Interests } from '../models/interests';
import Trip from '../models/trip';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  public profileview: Profile;
  public trips      : any[];
  public id         : string;
  public interests  : string[];
  public dests      : string[] = [];
  public gender     : string;
  public own        : boolean=false;
  constructor(private route: ActivatedRoute, private router: Router, private PS: ProfileService, private TS: TripsService, private AS:FirebaseService) {
    this.route.params.subscribe(params => {
      this.PS.getProfileByOwner(params['id'], (profile: Profile) => {
        this.id = params['id'];
        this.AS.getId(id=>this.own=this.id==id)
        this.profileview = profile;
        switch (profile.Gender) {
          case 'Female':
            this.gender = './assets/img/female.png';
            break;
          case 'Male':
            this.gender = './assets/img/male.png';
            break;
          case 'Other':
            this.gender = './assets/img/other.png';
            break;
          case 'Unspecified':
            this.gender = './assets/img/unspecified.png';
            break;
        }
        this.interests = (this.profileview.Interest as Interests).toStringArray();
        this.TS.getTripsByOwner(this.id, (trips, err) => {
          if (err) {
            console.error(err);
          } else {
            console.log(trips);
            console.log(this.dests);
            this.trips = trips.reverse();
          }
        });
      });
    });
    this.PS.getAllProfiles((a, err) => {
      if (a) {
        console.log('GOOD' + a);
      }
      if (err) {
        console.log('BAD' + err);
      }
    });
  }
  onClickView($key) {
    this.router.navigateByUrl(`/trip-view/${$key}`);
  }
  goToProfileEdit() {
    this.router.navigateByUrl(`/profile-edit/${this.id}`);
  }
  ngOnInit() {
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
  onClickEdit($key) {
    console.log($key);
    this.router.navigateByUrl(`/trip-edit/${$key}`);
  }
}
