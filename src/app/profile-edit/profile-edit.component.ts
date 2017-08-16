import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, animate, transition, style } from "@angular/animations";
import { ActivatedRoute, Router } from '@angular/router';
import Profile from '../models/profile';
import Trip from '../models/trip';

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
  public trips: any;
  @ViewChild('imgInput') el: ElementRef;
  id:string;
  constructor(private route: ActivatedRoute,
    private PS: ProfileService,
    private AS: FirebaseService,
    private IS: ImageService,
    private router: Router,
    public ts: TripsService) {
    AS.getId(id => this.id = id);
     this.ts.getTripsByOwner(this.id).subscribe(trips=>this.trips=trips);
   }

  img: string;
  @ViewChild('imgUp') imgUp: ElementRef;
  email: string;
  PID: string; // profile ID
  private sub: any;
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.PS.getProfileByOwner(params['id'], (profile: Profile) => {
        this.profileedit = profile;

        this.PID = params['id'];
        this.id = params['id'];
        console.log(profile);
        if(!this.profileedit.Interest)
          this.profileedit.Interest=new Interests();
        this.PID = params['id'];
        console.log(this.profileedit.Interest);

        // if (this.profileedit.Gender == 'female') {
        //   this.genderSign = './img/female.png';
        // }
      });
    });
  }
  test(){
    this.profileedit.Interest.Yoga = !this.profileedit.Interest.Yoga;
  }
showId(){
  console.log(this.id);
  console.log(this.trips);
  this.trips.forEach(function(fuck){
    console.log(fuck);
  })
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
      this.ts.addNewTrip(this.newTrip, (key) => {
        if (this.el.nativeElement.files[0])
          this.IS.uploadTrip(this.el.nativeElement.files[0], key, (snap, err) => {
            if (err)
              return console.log(err);
            this.ts.saveTrip({ ...this.newTrip, ImageURL: snap.downloadURL }, key, (s, e) => { })
          })
      });
    }
  }
  onClickProfile($key) {
    this.router.navigate(['/profile', $key]);
  }
  onClickEdit($key) {
    this.router.navigate(['/trip-edit', $key]);
  }

  onClickView($key) {
    this.router.navigate(['/trip-view', $key]);
  }
  onClickDelete(trip) {
    this.ts.deleteTrip(trip, trip.$key, (success, err) => {
      console.log(success || err);
      this.trips.remove(trip);
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
        });
      });
    }
  }

}
