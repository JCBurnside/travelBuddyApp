import { Injectable } from "@angular/core";
import Profile from "../models/profile";

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@Injectable()

export class ProfileService {

    profiles;

    constructor(public db: AngularFireDatabase) {
        this.profiles = db.database.ref('profiles');

    }

    /*
    * id is a string of the id of the user profile you trying to get
    * cb is a subscribe function that takes a Profile as an argument
    */
    getProfileById(id: string, cb: Function): void {
        this.db.object('/profiles/'+id).subscribe(profile=>cb(profile));
    }
    /*
    * cb is a callback function that takes a Profile[] as an argument
    */
    getAllProfiles(cb: Function) {
        this.profiles.subscribe(profiles=>cb(profiles));
    }
    /*
    * profile is the Profile object to be saved/updated
    * cb is the callback of what to do arguments are (success,error)
    */
    saveProfile(profile:Profile,cb:Function){
        if(profile.$key)
            this.db.object('/profiles/'+profile.$key).update(profile).then(()=>cb(true)).catch(err=>cb(false,err));
        else
            this.profiles.push(profile);
    }
    getProfileByOwner(id:string,cb:(profile:Profile,err:Error)=>void){
        this.profiles.orderByChild("ownerID").equalTo(id).on("value",cb);
    }
}

