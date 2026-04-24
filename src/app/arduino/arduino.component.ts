import { Component, inject } from '@angular/core';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-arduino',
  imports: [],
  templateUrl: './arduino.component.html',
  styleUrl: './arduino.component.css'
})
export class ArduinoComponent {
  service = inject(StoreService);

  add(item:any){
    this.service.addToCart(item);
  }
}
