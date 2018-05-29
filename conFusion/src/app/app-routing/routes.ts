// all the route we need
import { Routes } from '@angular/router'; // type

// all the components we have
import { MenuComponent } from '../menu/menu.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { HomeComponent } from '../home/home.component';
import { AboutusComponent } from '../aboutus/aboutus.component';
import { ContactComponent } from '../contact/contact.component';

export const routes: Routes = [
     {path: 'home', component: HomeComponent},
     {path: 'aboutus', component: AboutusComponent},
     {path: 'contactus', component: ContactComponent},
     {path: 'menu', component: MenuComponent},
     {path: '', redirectTo: '/home', pathMatch: 'full'} // default
];
