import { Component, inject } from '@angular/core';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-keyboards',
  imports: [],
  templateUrl: './keyboards.component.html',
  styleUrl: './keyboards.component.css'
})
export class KeyboardsComponent {
  service = inject(StoreService);

  add(item:any){
    this.service.addToCart(item);
  }
}
