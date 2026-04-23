import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-monitors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monitors.component.html'
})
export class MonitorsComponent {
  service = inject(StoreService);

  add(item:any){
    this.service.addToCart(item);
  }
}