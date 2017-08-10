import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FirebaseListObservable } from "angularfire2/database";

import Trip from "../models/trip";
import { TripsService } from "../services/trips.service";
import { FirebaseService } from "../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.css']
})
export class TripEditComponent implements OnInit {
  public tripedit:Trip=new Trip("","");
  constructor(private router: Router, private route:ActivatedRoute, public ts: TripsService, public as:FirebaseService) { 

  }
  private id;
  private sub: any;
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.ts.getTripById(params['id'], (tripedit:Trip) => {
        this.tripedit = tripedit;
      });
      this.id= params['id'];
    });  	
  }
  onSubmit(){
  	this.ts.saveTrip(this.tripedit, this.id,(success, err) =>{
  		if(err){
  			console.log(err);
  		}
  		else
  		{
  			console.log(success);
        this.router.navigateByUrl("/homepage");
  		}
  	});  	
  }
}
