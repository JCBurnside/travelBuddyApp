<<<<<<< HEAD
import { Component } from "@angular/core";
import Profile from "../models/profile";
import { ProfileService } from "../services/profile.service"
import {FirebaseService} from "../services/auth.service"
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> 899cd9d68a96202ac681a11588f88fdf5b41c91f

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
