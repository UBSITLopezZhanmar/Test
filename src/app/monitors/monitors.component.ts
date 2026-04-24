import { Component, inject } from '@angular/core';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-monitors',
  imports: [],
  templateUrl: './monitors.component.html',
  styleUrl: './monitors.component.css'
})
export class MonitorsComponent {
  service = inject(StoreService);

  add(item:any){
    this.service.addToCart(item);
  }
}