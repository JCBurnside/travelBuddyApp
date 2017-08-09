import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import Profile from "../models/profile";
import {ProfileService} from "../services/profile.service";
import { FirebaseService } from "../services/auth.service";
import { TripsService } from "../services/trips.service";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  public profile: Profile;
  constructor(private route: ActivatedRoute, private PS: ProfileService, private AS: FirebaseService) { }
  img: any;
  email:string;
  PID: string;
  private sub: any;
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.PS.getProfileById(params['id'], (profile:Profile) => {
        this.profile = profile;
      });
    });

    this.img = this.AS.currentUser().photoURL;
    this.email=this.AS.currentUser().email;
  }
  updateImg(img){}

}
