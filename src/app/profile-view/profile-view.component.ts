import Profile from '../models/profile';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { TripsService } from "../services/trips.service";
import { FirebaseService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Interests } from "../models/interests";

@Component({
  selector   : 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls  : ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  private profileview: Profile;
  private trips      : any;
  private id         : string;
  private interests  : string[];
  constructor(private route: ActivatedRoute, private PS: ProfileService, private TS: TripsService) {
    this.route.params.subscribe(params => {
      this.PS.getProfileById(params['id'], (profile: Profile) => {
        this.id          = params['id'];
        this.profileview = profile;
        this.interests=(this.profileview.Interest as Interests).toStringArray();
        this.trips = this.TS.getTripsByOwner(this.id);
      });
    });
    this.PS.getAllProfiles((a, err) => {
      if (a)
        console.log("GOOD" + a);
      if (err)
        console.log("BAD" + err);
    })
  }

  ngOnInit() {
  }

}
