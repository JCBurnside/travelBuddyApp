import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';

import Trip from '../models/trip';
import { TripsService } from '../services/trips.service';
import { FirebaseService } from '../services/auth.service';
import { ImageService } from '../services/image.service';
import { Router } from '@angular/router';
import { ReversePipe } from '../reverse.pipe';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  private newTrip = new Trip(null, null);
  public trips: any[]=[];
  private img: String;
  private id: string;
  @ViewChild('imgInput') el: ElementRef;
  constructor(public router: Router, public ts: TripsService, public as: FirebaseService, private is: ImageService) {
    as.getId(id => this.id = id);
    ts.getAllTrips((trips,err)=>{
      if(err)
        return console.log(err);
      trips.forEach(trip=>{
        let s:string=trip.Destinations.toString();
        let dest=s.split(','),city=dest[0],state=dest[1],country=dest[3];
        this.trips.push({...trip,city:city,state:state,country:country});
      })
    })
  }
  onChange() {
    console.log(this.newTrip.Destinations);
  }
  min = Math.min;
  // submit() {
  //   if (this.newTrip.Name == null)
  //     alert("The trip needs a name");
  //   else if (this.newTrip.Destinations.length == 0)
  //     alert("You need a destination");
  //   else if (!this.newTrip.StartDate || !this.newTrip.EndDate)
  //     alert("You need a" + !this.newTrip.StartDate ? ' Start Date' : 'n End Date');
  //   else {
  //     this.newTrip.Owner = this.id;
  //     this.ts.addNewTrip(this.newTrip, (key) => {
  //       if (this.el.nativeElement.files[0])
  //         this.is.uploadTrip(this.el.nativeElement.files[0], key, (snap, err) => {
  //           if (err)
  //             return console.log(err);
  //           this.ts.saveTrip({ ...this.newTrip, ImageURL: snap.downloadURL }, key, (s, e) => { })
  //         })
  //     });
  //   }
  // }


  // updateTrips() {
  //   this.trips.subscribe(trips => {
  //     trips.forEach(trip => {
  //       if (trip.ownerID == this.id) {
  //         console.log(trip);
  //       }
  //     });
  //   });
  // }
  // onClickProfile($key){
  //   this.router.navigate(['/profile', $key]);
  // }
  // onClickEdit($key) {
  //   this.router.navigate(['/trip-edit', $key]);
  // }
  onClickProfile(id){
    this.router.navigate(['/profile',id])
  }
  onClickView($key) {
    this.router.navigate(['/trip-view', $key]);
  }
  // onClickDelete(trip) {
  //   this.ts.deleteTrip(trip, trip.$key, (success, err) => {
  //     console.log(success || err);
  //     this.trips.remove(trip);
  //   })
  // }
  ngOnInit() {
  }

}
