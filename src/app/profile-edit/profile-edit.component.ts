import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, animate, transition, style } from "@angular/animations";
import { ActivatedRoute, Router } from '@angular/router';
import Profile from '../models/profile';
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
  private bool:Boolean;
  constructor(
    private route: ActivatedRoute,
    private PS: ProfileService,
    private AS: FirebaseService,
    private IS: ImageService,
    private router: Router) {
  }
  img: string;
  @ViewChild('imgUp') imgUp: ElementRef;
  email: string;
  PID: string; // profile ID
  private sub: any;
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.PS.getProfileById(params['id'], (profile: Profile) => {
        this.profileedit = profile;
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
