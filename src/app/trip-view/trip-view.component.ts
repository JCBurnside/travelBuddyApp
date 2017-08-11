import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FirebaseListObservable } from "angularfire2/database";

import Trip from "../models/trip";
import { TripsService } from "../services/trips.service";
import {ProfileService} from "../services/profile.service";
import { FirebaseService } from "../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.css']
})
export class TripViewComponent implements OnInit {

  constructor(private router: Router, private route:ActivatedRoute, public ts: TripsService, public ps:ProfileService, public as:FirebaseService) { }
  private _;
  private id;
  private sub: any;
  public tripview:Trip=new Trip("","");

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.ts.getTripById(params['id'], (tripview:Trip) => {
        this.tripview = tripview;
      });
      this.id= params['id'];
    }); 
    this.ps.getProfileByOwner(this.tripview.Owner,(profile,err) =>{
    	if(err){
    		console.log(err);
    	}
    	else{
    		this._=profile.FirstName;
    	}
    })  	
  }

}
