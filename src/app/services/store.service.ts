import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private http = inject(HttpClient);

  private products = signal([
    { name:'24" Monitor', category:'monitor', price:8000, image:'assets/monitor.jpg' },
    { name:'27" Monitor', category:'monitor', price:12000, image:'assets/monitor2.jpg' },

    { name:'Mechanical Keyboard', category:'keyboard', price:2500, image:'assets/keyboard.jpg' },
    { name:'Wireless Keyboard', category:'keyboard', price:1500, image:'assets/keyboard2.jpg' },

    { name:'RTX GPU', category:'pc', price:25000, image:'assets/gpu.jpg' },
    { name:'16GB RAM', category:'pc', price:4000, image:'assets/ram.jpg' },

    { name:'Arduino Uno', category:'arduino', price:800, image:'assets/arduino.jpg' }
  ]);

  monitors = computed(() => this.products().filter(p => p.category === 'monitor'));
  keyboards = computed(() => this.products().filter(p => p.category === 'keyboard'));
  pc = computed(() => this.products().filter(p => p.category === 'pc'));
  arduino = computed(() => this.products().filter(p => p.category === 'arduino'));

  cart = signal<any[]>([]);

  addToCart(item:any){
    this.cart.update(c => [...c, {...item, qty:1}]);
  }

  total = computed(() =>
    this.cart().reduce((sum, item) => sum + item.price * (item.qty || 1), 0)
  );

  // DATABASE
  apiUrl = 'http://localhost:3000/api/orders';

  saveOrder(data:any){
    return this.http.post(this.apiUrl, data);
  }

  getOrders(){
    return this.http.get<any[]>(this.apiUrl);
  }
}