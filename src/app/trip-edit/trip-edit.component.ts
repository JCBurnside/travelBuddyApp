import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseListObservable } from 'angularfire2/database';

import Trip from '../models/trip';
import { ImageService } from '../services/image.service';
import { TripsService } from '../services/trips.service';
import { FirebaseService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.css']
})
export class TripEditComponent implements OnInit {
  public tripedit: Trip = new Trip('', '');
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public ts: TripsService,
    public as: FirebaseService,
    public is: ImageService
  ) { }
  private id;
  private sub: any;
  @ViewChild('imgUp') imgUp: ElementRef;
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.ts.getTripById(this.id, (tripedit: Trip) => {
        this.as.getId(id=>{
          if(tripedit.Owner!=id)
            return this.router.navigateByUrl(`/trip-view/${this.id}`);
          this.tripedit = tripedit;
        })
      });
    });
  }
  onSubmit() {
    if (!this.tripedit.Destinations || !/^(.{1,},){2,2}?( .{1,})[^(, |,|;)]$/.test(this.tripedit.Destinations))
      alert("You need a destination");
    else if (!this.imgUp.nativeElement.files[0]) {
      this.ts.saveTrip(this.tripedit, (success, err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(success);
          this.router.navigateByUrl(`/profile/${this.tripedit.Owner}`);
        }
      });
    } else {
      this.is.uploadTrip(this.imgUp.nativeElement.files[0], this.tripedit.$key, (snap, err) => {
        if (err) {
          return console.log(err);
        }
        this.ts.saveTrip({ ...this.tripedit, ImageURL: snap.downloadURL }, (success, err) => {
          console.log(success || err);
          this.router.navigateByUrl(`/profile/${this.tripedit.Owner}`);
        });
      });
    }
  }
}
