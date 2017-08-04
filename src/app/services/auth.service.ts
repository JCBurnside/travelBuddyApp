import { Injectable } from '@angular/core';
import { User } from '../models/user';

import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class FirebaseService{
	authState;

	signup(user: User){
		this.af.auth.createUserWithEmailAndPassword(user.email,user.password)
		.then(() => {
			this.router.navigateByUrl('/');
		})
		.catch((e) => {
			console.log(e);
		})
		console.log(this.isAuthed());
	}
	signin(user: User){
		this.af.auth.signInWithEmailAndPassword(user.email, user.password)
		.then(() => {
			this.router.navigateByUrl('/');
		})
		.catch((e) => {
			console.log(e);
		})
	}
	isAuthed(){
		return !!this.authState;
	}
	currentUser(){
		return this.af.auth.currentUser;
	}
	constructor(private af: AngularFireAuth, private router: Router){
		this.af.authState.subscribe((authState) => {
			this.authState = authState
		});
	}
}