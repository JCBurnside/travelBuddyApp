import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { SplashPageComponent } from '../splash/splash.component';
export const routes = [
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '',
    component: SplashPageComponent
  },
  {
    path: 'profile',
    component: ProfileViewComponent
  }
]
