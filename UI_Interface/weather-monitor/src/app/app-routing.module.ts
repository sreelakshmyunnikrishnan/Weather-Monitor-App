import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { UserpageComponent } from './userpage/userpage.component';
import { ViewmapComponent } from './viewmap/viewmap.component';
const routes: Routes = [
{path:'register',component:RegistrationComponent},
{path:'login',component:LoginComponent},
{path:'userpage',component:UserpageComponent},
{path:'viewmap',component:ViewmapComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
