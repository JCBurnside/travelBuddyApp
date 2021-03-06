
import { Component } from '@angular/core';
import { FirebaseService } from '../services/auth.service';

import { User } from '../models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

// TODO: Add the firebase rejections to validate
export class SignupComponent {
  public errors = { email: '', pass: '', confpass: '' };  // This one is public so that angular can access it
  /**
   * name
   */
  public name() {
    
  } model = { email: '', pass: '', confpass: '' };          // Model that angular will store data in
  public user: User;             // User that we will send to the database

  validate() {
    this.errors = { email: '', pass: '', confpass: '' };
    if (!this.model.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.model.email)) {
      this.errors.email = 'Please provide valid email';
    }
    if (!this.model.pass || !/^.{6,}$/.test(this.model.pass)) {
      this.errors.pass = 'Please provide a valid password. (at least 6 characters)';
    }
    if (!this.model.confpass) {
      this.errors.confpass = 'Please confirm your password';
    }
    if (this.model.confpass != this.model.pass) {
      this.errors.confpass = 'Passwords must match';
    }
    return (this.errors.email || this.errors.pass || this.errors.confpass); // Returns true if there are errors
  }
  onSubmit() {
    if (this.validate()) {                                                  // If there are errors, do not submit the form
      return;
    }
    this.user = new User(this.model.email, this.model.pass);                // Create a new user object with the model email and password
    console.log(this.user);
    // Pass the user to the db here
    this.fbs.signup(this.user);
    console.log(this.fbs.isAuthed());
  }

  constructor(private fbs: FirebaseService) {
    console.log(fbs.isAuthed());
  }
}
