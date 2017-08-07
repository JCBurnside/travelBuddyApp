import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { SplashPageComponent } from '../splash/splash.component';
import { TripViewComponent } from "../trip-view/trip-view.component";
import { TripEditComponent } from "../trip-edit/trip-edit.component";

export const routes = [
  {
    path     : 'signin',
    component: SigninComponent
  },
  {
    path     : 'signup',
    component: SignupComponent
  },
  {
    path     : '',
    component: SplashPageComponent
  },
  {
    path     : 'profile',
    component: ProfileViewComponent
  },
  {
    path     : 'trip-view',
    component: TripViewComponent
  }
]
