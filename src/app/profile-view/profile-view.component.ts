import Profile from '../models/profile';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { TripsService } from "../services/trips.service";
import { FirebaseService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Interests } from "../models/interests";
import Trip from "../models/trip";

@Component({
  selector   : 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls  : ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  private profileview: Profile;
  private trips      : any[];
  private id         : string;
  private interests  : string[];
  private dests:string[]=[];
  constructor(private route: ActivatedRoute, private PS: ProfileService, private TS: TripsService) {
    this.route.params.subscribe(params => {
      this.PS.getProfileByOwner(params['id'], (profile: Profile) => {
        this.id          = params['id'];
        this.profileview = profile;
        this.interests=(this.profileview.Interest as Interests).toStringArray();
        this.TS.getTripsByOwner(this.id,(trips,err)=>{
          if(err){
            console.error(err);
          }else{
            console.log(trips);
            console.log(this.dests);
            this.trips=trips;
          }
        });
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
