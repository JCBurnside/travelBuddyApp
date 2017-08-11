import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Profile from '../models/profile';

import { ProfileService } from '../services/profile.service';
import { FirebaseService } from '../services/auth.service';
import { TripsService } from '../services/trips.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  public profileedit: Profile;
  genderSign: string;
  constructor(private route: ActivatedRoute, private PS: ProfileService, private AS: FirebaseService) { }
  img: any;
  email: string;
  PID: string; // profile ID
  private sub: any;
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.PS.getProfileById(params['id'], (profile: Profile) => {
        this.profileedit = profile;
        // if (this.profileedit.Gender == 'female') {
        //   this.genderSign = './img/female.png';
        // }
      });
    });

  }
  updateImg(img) { }
  onSubmit() {
    this.PS.saveProfile(this.profileedit, (profile, err) => {
      if (err) {
        console.log(err);
      }
    });
  }

}
