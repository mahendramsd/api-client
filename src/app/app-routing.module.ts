import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PersonComponent } from './person/person.component';
import { AddPersonComponent } from './add-person/add-person.component';

const routes: Routes = [
  { path: '', component: PersonComponent,canActivate:[AuthGaurdService] },
  { path: 'addPerson', component: AddPersonComponent,canActivate:[AuthGaurdService]},
  { path: 'editPerson/:id', component: AddPersonComponent,canActivate:[AuthGaurdService]},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent,canActivate:[AuthGaurdService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
