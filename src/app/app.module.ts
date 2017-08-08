import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../environments/firebase.config';

import ProfileService from './services/profile.service';
import { FirebaseService } from './services/auth.service';
import { TripsService } from "./services/trips.service";
import { AngularFireDatabase } from "angularfire2/database";

import { routes } from './services/routes';

import { SplashPageComponent } from './splash/splash.component';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileViewComponent } from "./profile-view/profile-view.component";
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TripEditComponent } from './trip-edit/trip-edit.component';
import { TripViewComponent } from './trip-view/trip-view.component';
import { SearchComponent } from './search/search.component';
import { ProfileSearchResultsComponent } from './profile-search-results/profile-search-results.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    ProfileViewComponent,
    SplashPageComponent,
    ProfileEditComponent,
    HomepageComponent,
    TripEditComponent,
    TripViewComponent,
    SearchComponent,
    ProfileSearchResultsComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule.forRoot(routes),
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig)

  ],
  providers: [
    {provide:FirebaseService,useClass:FirebaseService},
    {provide:AngularFireAuth,useClass:AngularFireAuth},
    {provide:ProfileService,useClass:ProfileService},
    {provide:AngularFireDatabase,useClass:AngularFireDatabase},
    {provide:TripsService,useClass:TripsService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
