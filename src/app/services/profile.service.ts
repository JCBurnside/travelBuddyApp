import { Injectable } from "@angular/core";
import Profile from "../models/profile";

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@Injectable()

export class ProfileService {

    profiles;

    constructor(db: AngularFireDatabase) {
        this.profiles = db.database.ref('profiles');
    }

    /*
    * id is a string of the id of the user profile you trying to get
    * cb is a callback function that takes a Profile as an argument
    */
    getProfileById(id: string, cb: Function): void {
        let profile;
        this.profiles.orderByChild("ownerID")
            .equalTo(id)
            .on("value", (snapshot) => {
                Object.keys(snapshot.val()).forEach(key => {
                    cb({ ...snapshot.val()[key], $key: key })
                });
            }).catch(err=>cb(null,err));
    }
    /*
    * cb is a callback function that takes a Profile[] as an argument
    */
    getAllProfiles(cb: Function) {
        this.profiles.on("value", snapshot => {
            let arr: Profile[] = [];
            Object.keys(snapshot).forEach(key => {
                arr.push({ ...snapshot.val()[key], $key: key });
            });
            cb(arr);
        }).catch(err=>{
            cb(null,err);
        })
    }

}

