import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Profile from '../models/profile';

import { ImageService } from '../services/image.service';
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
  constructor(private route: ActivatedRoute,
              private PS: ProfileService,
              private AS: FirebaseService,
              private IS:ImageService,
              private router: Router) { }
  img: string;
  @ViewChild('imgUp') imgUp: ElementRef;
  email: string;
  PID: string; // profile ID
  private sub: any;
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.PS.getProfileById(params['id'], (profile: Profile) => {
        this.profileedit = profile;
        this.PID=params['id'];
        // if (this.profileedit.Gender == 'female') {
        //   this.genderSign = './img/female.png';
        // }
      });
    });

  }
  onSubmit() {
    if (!this.imgUp.nativeElement.files[0]) {
      this.PS.saveProfile(this.profileedit, (profile, err) => {
        if (err) {
          console.log(err);
        }else{
          console.log(profile);
        }
        this.router.navigate(['/profile/',this.PID])
      });
    }else{
      this.IS.uploadProfile(this.imgUp.nativeElement.files[0],this.profileedit,(snap,err)=>{
        if(err){
          return console.log(err);
        }
        this.profileedit.ImgURL=snap.downloadURL;
        this.PS.saveProfile(this.profileedit,(success,err)=>{
          console.log(success||err);
        })
      })
    }
  }

}
