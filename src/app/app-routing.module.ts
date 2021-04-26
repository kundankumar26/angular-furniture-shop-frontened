import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { VentorComponent } from './ventor/ventor.component';
import { OrderItemComponent } from './order-item/order-item.component';



const routes: Routes = [
  {path: 'signup', component: RegisterComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  {path:"admin", component:AdminComponent},
  {path:"employee", component:OrderItemComponent},
  {path:"ventor", component:VentorComponent},

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
