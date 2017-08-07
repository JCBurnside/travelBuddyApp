import { Component } from "@angular/core";
import Profile from "../models/profile";
import { ProfileService } from "../services/profile.service"
import {FirebaseService} from "../services/auth.service"

@Component({
    selector:'profile-view',
    templateUrl:'./profile-view.component.html'
})
export class ProfileViewComponent{
    user:Profile;
    constructor(private ps:ProfileService,private fbs:FirebaseService){
        fbs.currentUser().getIdToken().then(res=>console.log(res));
        // user=ps.getProfileById()
    }
}