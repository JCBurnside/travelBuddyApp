import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';

import Trip from '../models/trip';
import { TripsService } from '../services/trips.service';
import { FirebaseService } from '../services/auth.service';
import { ImageService } from '../services/image.service';
import { ProfileService } from "../services/profile.service";
import { Router } from '@angular/router';
import { ReversePipe } from '../reverse.pipe';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public trips: any[] = [];
  private img: String;
  private id: string;
  public maxHeight:number=100;
  @ViewChild('imgInput') el: ElementRef;
  @ViewChild('tripsCon') tripCon: ElementRef;
  constructor(public router: Router, public ts: TripsService, public as: FirebaseService, private is: ImageService, private ps:ProfileService) {
    as.getId(id => this.id = id);
    ts.getAllTrips((trips, err) => {
      if (err) {
        return console.log(err);
      }
      trips.forEach(trip => {
        let s: string = trip.Destinations.toString();
        let dest = s.split(','), city = dest[0], state = dest[1], country = dest[2];
        ps.getProfileByOwner(trip.Owner,(p,e)=>{
          if(p){
            this.trips.push({ ...trip, city: city, state: state, country: country, OwnerFB: p.Facebook});
          } else {
            this.trips.push({...trip, city: city, state: state, country: country, OwnerFB:undefined})
          }
        })
      })
    })
  }
  onClickProfile(id) {
    this.router.navigateByUrl(`/profile/${id}`);
  }
  onClickView($key) {
    this.router.navigateByUrl(`/trip-view/${$key}`);
  }
  ngOnInit() {
    setTimeout(()=>{
      let tripsList=this.tripCon.nativeElement;
      console.log(Object.keys(tripsList))
      // for(let ctr=0;ctr<tripsList.length;ctr++){
      //   console.log(this.maxHeight+'\n'+tripsList[ctr].clientHeight);
      //   this.maxHeight=Math.max(this.maxHeight,tripsList[ctr].clientHeight);
      // }
    },0)
  }

}
