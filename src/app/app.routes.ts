import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MonitorsComponent } from './monitors/monitors.component';
import { KeyboardsComponent } from './keyboards/keyboards.component';
import { PcComponent } from './pc/pc.component';
import { ArduinoComponent } from './arduino/arduino.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'monitors', component: MonitorsComponent },
  { path: 'keyboards', component: KeyboardsComponent },
  { path: 'pc', component: PcComponent },
  { path: 'arduino', component: ArduinoComponent },
  { path: 'cart', component: CartComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];