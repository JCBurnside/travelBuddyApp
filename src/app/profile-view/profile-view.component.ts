import Profile from '../models/profile';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import {FirebaseService} from '../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  private profileview: Profile;
  constructor(private route: ActivatedRoute, private PS: ProfileService) {
    this.route.params.subscribe(params => {
      this.PS.getProfileById(params['id'], (profile: Profile) => {
        console.log(profile)
        this.profileview = profile;
      });
    });
    this.PS.getAllProfiles((a,err)=>{
      if(a)
        console.log("GOOD"+a);
      if(err)
        console.log("BAD"+err);
    })
  }

  ngOnInit() {
  }

}
