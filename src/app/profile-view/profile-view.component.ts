import { Component } from "@angular/core";
import Profile from "../models/profile";
import ProfileService from "../services/profile.service"
import {FirebaseService} from "../services/auth.service"
import { TripsService } from "../services/trips.service";

@Component({
    selector:'profile-view',
    templateUrl:'./profile-view.component.html'
})
export class ProfileViewComponent{
    user:Profile;
    constructor(private ps:ProfileService,private fbs:FirebaseService,private ts:TripsService){
        // fbs.currentUser().getIdToken().then(res=>console.log(res));
        // user=ps.getProfileById()
        ts.getTripById("-KqiE4_GfizyK5NNvAFz",trip=>console.log(trip));
        console.log(ts.getAllTrips());
    }
}