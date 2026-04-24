import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-monitors',
  imports: [CommonModule],
  templateUrl: './monitors.component.html',
  styleUrl: './monitors.component.css'
})
export class MonitorsComponent {
  service = inject(StoreService);

  add(item:any){
    this.service.addToCart(item);
  }
}