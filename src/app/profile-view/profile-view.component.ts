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
  private profileview: Profile;
  private trips: any[];
  private id: string;
  private interests: string[];
  private dests: string[] = [];
  public gender: string;
  constructor(private route: ActivatedRoute, private router:Router, private PS: ProfileService, private TS: TripsService) {
    this.route.params.subscribe(params => {
      this.PS.getProfileByOwner(params['id'], (profile: Profile) => {
        this.id = params['id'];
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
            this.trips=trips;
            /*trips.forEach((trip: Trip, i, arr) => {
              var keys = Object.keys(trip.Destinations);
              var dest = [];
              keys.forEach(function (key) {
                console.log(key, trip.Destinations[key]);
                dest.push(trip.Destinations[key]);
              });
              this.dests.push(dest.join(', '));
            });
            console.log(this.dests);
            this.trips = trips;*/
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
    this.router.navigate(['/trip-view', $key]);
  }
  ngOnInit() {
  }

}
