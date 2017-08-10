import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FirebaseListObservable } from "angularfire2/database";

import Trip from "../models/trip";
import { TripsService } from "../services/trips.service";
import { FirebaseService } from "../services/auth.service";
import { ImageService } from "../services/image.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  private newTrip = new Trip(null, null);
  public trips:FirebaseListObservable<any[]>;
  private img:String;
  private id:string;
  @ViewChild('imgInput') el:ElementRef;
  constructor(public router: Router,public ts: TripsService,public as:FirebaseService,private is:ImageService) {

    this.trips=ts.getTripsByOwner(this.id);
  }
  onChange() {
    console.log(this.newTrip.Destinations);
  }
  destChanged(test: any) {
    this.newTrip.Destinations = [test];
  }
  submit() {
    if (this.newTrip.Name == null)
      alert("The trip needs a name");
    else if (this.newTrip.Destinations.length == 0)
      alert("You need a destination");
    else if (!this.newTrip.StartDate || !this.newTrip.EndDate)
      alert("You need a" + !this.newTrip.StartDate ? ' Start Date' : 'n End Date');
    else {
      this.newTrip.Owner=this.as.getId();
      this.ts.addNewTrip(this.newTrip,(key)=>{
        this.is.uploadTrip(this.el.nativeElement.files[0],key,(snap,err)=>{
          if(err)
            return console.log(err);
          this.ts.saveTrip({...this.newTrip,ImageURL:snap.downloadURL},key,(s,e)=>{})
        })
      });
    }
    this.updateTrips();
  }
  updateTrips(){
    this.trips.subscribe(trips=>{
      trips.forEach(trip=>{
        if(trip.ownerID==this.id)
          console.log(trip)
      });
    })
  }

  onClick($key){
    this.router.navigate(["/trip-edit", $key]);
  }

  ngOnInit() {
    this.updateTrips();
    this.id=this.as.getId();
  }

}
