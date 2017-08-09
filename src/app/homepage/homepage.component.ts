import { Component, OnInit } from '@angular/core';
import Trip from "../models/trip";
import { TripsService } from "../services/trips.service";
import { FirebaseService } from "../services/auth.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  private newTrip = new Trip(null, null);
  public trips;
  public items;
  constructor(public ts: TripsService,public as:FirebaseService) {
    this.id=as.getId();
    this.items = [{Owner: this.id}];
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
      this.ts.addNewTrip(this.newTrip);
    }
    this.updateTrips();
  }
  updateTrips(){
    this.trips=this.ts.getTripsByOwner(this.id);
  }
  id:string;

  ngOnInit() {
    this.updateTrips();
  }

}
