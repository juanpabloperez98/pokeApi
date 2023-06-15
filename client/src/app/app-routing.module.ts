import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CharactersComponent } from './home/characters/characters.component';
import { AuthGuard } from './auth/auth.guard';
import { CharacterSpecificComponent } from './home/character-specific/character-specific.component';
import { ProfileComponent } from './home/profile/profile.component';


export const Approutes: Routes = [
  {
      path:'auth/login',
      component: LoginComponent,
      pathMatch:'full'
  },
  {
      path:'auth/signup',
      component: RegisterComponent,
      pathMatch:'full'
  },
  {
      path:'home/characters',
      component: CharactersComponent,
      canActivate:[AuthGuard],
      pathMatch:'full'
  },
  {
      path:'home/character/:name',
      component: CharacterSpecificComponent,
      canActivate:[AuthGuard],
      pathMatch:'full'
  },
  {
      path:'home/profile',
      component: ProfileComponent,
      canActivate:[AuthGuard],
      pathMatch:'full'
  },
  {
      path: '**',
      redirectTo: '/auth/login'
  }
]
