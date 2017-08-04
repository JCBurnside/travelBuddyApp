import { Injectable } from "@angular/core";
import Profile from "../models/profile";

import { AngularFireDatabase,FirebaseListObservable } from "angularfire2/database";

@Injectable()
export default class ProfileService{
    items:FirebaseListObservable<Profile[]>;
    constructor(db:AngularFireDatabase){
        this.items=db.list('profiles');
    }
    getProfileById(id:string):Profile{
        this.items.forEach(_=>{
            let profile=_.find((value,index,obj)=>{return value.ownerID===id;})
            if(profile)
                return profile;
        });
        
        return null;
    }
}
