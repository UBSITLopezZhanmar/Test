import { Component, inject } from '@angular/core';
import { StoreService } from '../store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-keyboards',
  imports: [CommonModule],
  templateUrl: './keyboards.component.html',
  styleUrl: './keyboards.component.css'
})
export class KeyboardsComponent {
  service = inject(StoreService);

  add(item:any){
    this.service.addToCart(item);
  }
}
