import { Injectable } from "@angular/core";
import Profile from "../models/profile";
import { Interests } from '../models/interests'

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import * as firebase from "firebase/app";
import 'firebase/database'

@Injectable()

export class ProfileService {

    profiles:firebase.database.Reference;

    constructor(public db: AngularFireDatabase) {
        this.profiles = db.database.ref('profiles');

    }
    getProfileByOwner(id:string,cb:(profile:Profile,err:Error|string)=>void){
        this.profiles.orderByChild("ownerID").equalTo(id).on("value",(snap,err)=>{
            if(snap.val()){
                let interests:Interests=Interests.convertToInterest(snap.val().Interest||new Interests());
            
                cb({...snap.exportVal(),Interest:interests},null);
            }else
                cb(new Profile(id,""),err);
        });
    }
    /*
    * id is a string of the id of the user profile you trying to get
    * cb is a subscribe function that takes a Profile as an argument
    */
    getProfileById(id: string, cb:(profile:Profile)=>void): void {
        this.db.object('/profiles/'+id).subscribe(profile=>{
            delete profile.$value;
            let interests:Interests=Interests.convertToInterest(profile.Interest);
            console.log(profile.Interest);
            cb({...profile,Interest:interests});
        });
    }

    /*
    * cb is a callback function that takes a Profile[] as an argument
    */
    getAllProfiles(cb: Function) {
        console.log("SENDERING REQUEST");
        this.profiles.on("value",(snap,err)=>{
            if(err){
                console.log("ERRORED");
                cb(null,err);
            }else{
                console.log("SUCCESS");
                let out:Profile[]=[];
                snap.forEach(item=>{out.push(item.exportVal());return true;});
                cb(out,err);
            }
        });
        console.log("REQUEST SENT");
    }
    /*
    * profile is the Profile object to be saved/updated
    * cb is the callback of what to do arguments are (success,error)
    */
    saveProfile(profile:Profile,cb:Function){
        delete profile.Interest.toStringArray;
        if(profile.$key){
            var id=profile.$key;
            delete profile.$key;
            this.db.object('/profiles/'+id).update(profile).then(()=>cb(true)).catch(err=>cb(false,err));
        }else{
            delete profile.$key;
            this.profiles.push(profile);
        }
    }
}

