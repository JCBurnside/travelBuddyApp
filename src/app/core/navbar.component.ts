import { Component } from '@angular/core';
import { FirebaseService } from "../services/auth.service";
import { Router } from '@angular/router';

@Component({
    selector: 'ct-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    constructor(private as:FirebaseService,private router:Router){}
    goToPE(){
        this.router.navigate(['/profile-edit',this.as.getId()])
    }
 }