import { Injectable } from "@angular/core";
import Profile from "../models/profile";

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@Injectable()

export class ProfileService{
    items:FirebaseListObservable<Profile[]>;
    constructor(db:AngularFireDatabase){
        this.items=db.list('profiles');

    }
    getProfileById(id: string,cb:Function): void {
        let profile;
        this.items.forEach(_ => {
            cb(_.find((value, index, obj) => { return value.ownerID === id; }));
        });
    }
    getAllProfiles():Profile[]{
        let out:Profile[]=new Array<Profile>();
        this.items.forEach(item=>{
            item.forEach(_=>out.push(_));
        })
         return out;
    }

}

