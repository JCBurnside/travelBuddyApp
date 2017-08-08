import Profile from "../models/profile";
import ProfileService from '../services/profile.service';
import {FirebaseService} from "../services/auth.service";
import { Component, OnInit } from '@angular/core';

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
