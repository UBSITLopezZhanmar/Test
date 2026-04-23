import { Component, inject } from '@angular/core';
import { StoreService } from '../services/store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pc',
  imports: [CommonModule],
  templateUrl: './pc.component.html',
  styleUrl: './pc.component.css'
})
export class PcComponent {
  service = inject(StoreService);

  add(item:any){
    this.service.addToCart(item);
  }
}
