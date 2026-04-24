import { Component, inject } from '@angular/core';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-pc',
  imports: [],
  templateUrl: './pc.component.html',
  styleUrl: './pc.component.css'
})
export class PcComponent {
  service = inject(StoreService);

  add(item:any){
    this.service.addToCart(item);
  }
}
