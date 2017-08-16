import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, animate, transition, style } from "@angular/animations";
import { ActivatedRoute, Router } from '@angular/router';
import Profile from '../models/profile';
import Trip from '../models/trip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Interests } from "../models/interests";


import { ImageService } from '../services/image.service';
import { ProfileService } from '../services/profile.service';
import { FirebaseService } from '../services/auth.service';
import { TripsService } from '../services/trips.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
  animations: [
    trigger('toggleState', [
      state('false', style({ backgroundColor: "#26a69a" })),
      state('true', style({ background: 'rgba(0, 0, 0, 0.2)' })),
      transition('true=>false', animate('300ms ease-out')),
      transition('flase=>true', animate('300ms ease-in'))
    ])
  ]
})
export class ProfileEditComponent implements OnInit {
  public profileedit: Profile;
  genderSign: string;
  private newTrip = new Trip(null, null);
  public trips: any[];
  @ViewChild('imgInput') el: ElementRef;
  id: string;
  constructor(private route: ActivatedRoute,
    private PS: ProfileService,
    private AS: FirebaseService,
    private IS: ImageService,
    private router: Router,
    public ts: TripsService) {
    AS.getId(id => this.id = id);

  }

  img: string;
  @ViewChild('imgUp') imgUp: ElementRef;
  email: string;
  PID: string; // profile ID
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.PS.getProfileByOwner(params['id'], (profile: Profile) => {
        this.profileedit = profile;

        this.PID = params['id'];
        this.id = params['id'];
        console.log(profile);
        if (!this.profileedit.Interest)
          this.profileedit.Interest = new Interests();
        this.PID = params['id'];
        console.log(this.profileedit.Interest);
        this.ts.getTripsByOwner(this.id, (trips, err) => {
          if (err)
            return console.log(err);
          this.trips = trips;
              trips.forEach(trip=>console.log(trip.Price));
        });

        // if (this.profileedit.Gender == 'female') {
        //   this.genderSign = './img/female.png';
        // }
      });
    });
  }
  test() {
    this.profileedit.Interest.Yoga = !this.profileedit.Interest.Yoga;
  }

  destChanged(test: any) {
    this.newTrip.Destinations = [test];
  }
  min = Math.min;
  submit() {
    if (this.newTrip.Name == null)
      alert("The trip needs a name");
    else if (this.newTrip.Destinations.length == 0)
      alert("You need a destination");
    else if (!this.newTrip.StartDate || !this.newTrip.EndDate)
      alert("You need a" + !this.newTrip.StartDate ? ' Start Date' : 'n End Date');
    else {
      this.newTrip.Owner = this.PID;
      console.log(this.newTrip.Price);
      this.newTrip.Price=Math.abs(this.newTrip.Price);
      this.ts.saveTrip(this.newTrip, (trip, err) => {
        if (this.el.nativeElement.files[0]) {
          console.log('image begin upload');
          this.IS.uploadTrip(this.el.nativeElement.files[0], trip.$key, (snap, err) => {
            if (err)
              return console.error(err);
            this.ts.saveTrip({ ...trip, ImageURL: snap.downloadURL }, (s, e) => {
              console.log(s || e);
            });
            this.ts.getTripsByOwner(this.id, (trips, err) => {
              if (err)
                return console.log(err);
              this.trips = trips;
              trips.forEach(trip=>console.log(trip.Price));
              console.log(this.trips)
            });
          })
        } else {
          console.log('no image to upload')
        }
      });
    }
  }
  onClickProfile($key) {
    this.router.navigate(['/profile', $key]);
  }
  onClickEdit($key) {
    console.log($key)
    this.router.navigate(['/trip-edit', $key]);
  }

  onClickView($key) {
    this.router.navigate(['/trip-view', $key]);
  }
  onClickDelete(trip) {
    this.ts.deleteTrip(trip, (success, err) => {
      console.log(success || err);
      var i = this.trips.findIndex((_trip) => {
        return trip.$key == _trip.$key
      })
      this.trips.slice(i, i)
    })
  }

  onSubmit() {
    console.log(this.profileedit.Interest)

    if (!this.imgUp.nativeElement.files[0]) {
      this.PS.saveProfile(this.profileedit, (profile, err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(profile);
        }
        this.router.navigate(['/profile/', this.PID])
      });
    } else {
      this.IS.uploadProfile(this.imgUp.nativeElement.files[0], this.profileedit, (snap, err) => {
        if (err) {
          return console.log(err);
        }
        this.profileedit.ImgURL = snap.downloadURL;
        this.PS.saveProfile(this.profileedit, (success, err) => {
          console.log(success || err);
          this.router.navigate(['/profile/', this.PID]);
        })
      })
    }
  }

}
