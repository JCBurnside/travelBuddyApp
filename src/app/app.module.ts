import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../environments/firebase.config';


import { ProfileService } from './services/profile.service';
import { FirebaseService } from './services/auth.service';
import { TripsService } from './services/trips.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { ImageService } from './services/image.service';

import { routes } from './services/routes';

import { SplashPageComponent } from './splash/splash.component';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TripEditComponent } from './trip-edit/trip-edit.component';
import { TripViewComponent } from './trip-view/trip-view.component';
import { NavbarComponent } from './nav/navbar.component';
import { ReversePipe } from './reverse.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SigninComponent,
    SignupComponent,
    ProfileViewComponent,
    SplashPageComponent,
    ProfileEditComponent,
    HomepageComponent,
    TripEditComponent,
    TripViewComponent,
    ReversePipe
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [
    { provide: FirebaseService, useClass: FirebaseService },
    { provide: AngularFireAuth, useClass: AngularFireAuth },
    { provide: ProfileService, useClass: ProfileService },
    { provide: AngularFireDatabase, useClass: AngularFireDatabase },
    { provide: TripsService, useClass: TripsService },
    { provide: ImageService, useClass: ImageService }
  ],
  bootstrap: [AppComponent]
})
<<<<<<< Updated upstream
export class AppModule { }
=======
export class AppModule {
  constructor(public as: AngularFireAuth) {

  }
}
>>>>>>> Stashed changes
