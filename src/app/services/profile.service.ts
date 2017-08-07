import { Injectable } from "@angular/core";
import Profile from "../models/profile";

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@Injectable()
<<<<<<< HEAD
export class ProfileService{
    items:FirebaseListObservable<Profile[]>;
    constructor(db:AngularFireDatabase){
        this.items=db.list('profiles');
=======
export default class ProfileService {
    items: FirebaseListObservable<Profile[]>;
    constructor(db: AngularFireDatabase) {
        this.items = db.list('profiles');
>>>>>>> 899cd9d68a96202ac681a11588f88fdf5b41c91f
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
