import { Component } from '@angular/core';
import { FirebaseService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ct-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  id: string;
  constructor(private as: FirebaseService, private router: Router) {
    this.as.getId(id => this.id = id);
  }
  goToPE() {
    this.router.navigateByUrl(`/profile-edit/${this.id}`);
  }
  authed() {
    return this.as.isAuthed();
  }
  signOut() {
    this.as.signout();
    this.router.navigateByUrl('/');
  }
  userprofile() {
     this.as.getId(id => this.id = id);
    this.router.navigateByUrl(`/profile/${this.id}`);
  }
}
