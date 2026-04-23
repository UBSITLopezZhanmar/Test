import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private http = inject(HttpClient);

  private products = signal([
    { name:'27" LG UltraGear', category:'MONITOR', price:18000, image:'assets/monitor2.jpg' },
    { name:'24" AOC', category:'MONITOR', price:8000, image:'assets/monitor2.jpg' },
    { name:'27" Dell UltraSharp', category:'MONITOR', price:28000, image:'assets/monitor.jpg' },
    { name:'34" LG UltraWide', category:'MONITOR', price:20000, image:'assets/monitor2.jpg' },
    { name:'27" Samsung Odyssey', category:'MONITOR', price:15000, image:'assets/monitor2.jpg' },
    { name:'32" ViewSonic', category:'MONITOR', price:12000, image:'assets/monitor2.jpg' },
    { name:'27" ASUS TUF', category:'MONITOR', price:14000, image:'assets/monitor2.jpg' },
    { name:'24" BenQ', category:'MONITOR', price:7000, image:'assets/monitor2.jpg' },
    { name:'27" MSI Optix', category:'MONITOR', price:12000, image:'assets/monitor2.jpg' },
    { name:'27" HP', category:'MONITOR', price:10000, image:'assets/monitor2.jpg' },

    { name:'Logitech G Pro X', category:'KEYBOARD', price:6000, image:'assets/keyboard.jpg' },
    { name:'Razer Huntsman Mini', category:'KEYBOARD', price:4000, image:'assets/keyboard2.jpg' },
    { name:'Corsair K70 RGB Pro', category:'KEYBOARD', price:6500, image:'assets/keyboard2.jpg' },
    { name:'SteelSeries Apex Pro', category:'KEYBOARD', price:9000, image:'assets/keyboard2.jpg' },
    { name:'HyperX Alloy Origins', category:'KEYBOARD', price:4500, image:'assets/keyboard2.jpg' },
    { name:'Keychron K2', category:'KEYBOARD', price:3500, image:'assets/keyboard2.jpg' },
    { name:'ASUS ROG Strix Scope', category:'KEYBOARD', price:5000, image:'assets/keyboard2.jpg' },
    { name:'Redragon K552 Kumara', category:'KEYBOARD', price:1500, image:'assets/keyboard2.jpg' },
    { name:'Microsoft Ergonomic Keyboard', category:'KEYBOARD', price:2500, image:'assets/keyboard2.jpg' },
    { name:'Anne Pro 2', category:'KEYBOARD', price:3000, image:'assets/keyboard2.jpg' },

    { name:'AMD Ryzen 7 7800X3D', category:'PC INTERNALS', price:24000, image:'assets/gpu.jpg' },
    { name:'Intel Core i7-14700K', category:'PC INTERNALS', price:23000, image:'assets/ram.jpg' },
    { name:'NVIDIA RTX 4090', category:'PC INTERNALS', price:90000, image:'assets/ram.jpg' },
    { name:'AMD Radeon RX 7900 XTX', category:'PC INTERNALS', price:45000, image:'assets/ram.jpg' },
    { name:'ASUS ROG Strix Series', category:'PC INTERNALS', price:12000, image:'assets/ram.jpg' },
    { name:'MSI MPG / MAG Series', category:'PC INTERNALS', price:8000, image:'assets/ram.jpg' },
    { name:'Corsair Vengeance DDR5', category:'PC INTERNALS', price:6000, image:'assets/ram.jpg' },
    { name:'G.Skill Trident Z5 RGB', category:'PC INTERNALS', price:7000, image:'assets/ram.jpg' },
    { name:'Samsung 990 Pro NVMe SSD', category:'PC INTERNALS', price:6000, image:'assets/ram.jpg' },
    { name:'Western Digital Black', category:'PC INTERNALS', price:5500, image:'assets/ram.jpg' },

    { name:'DHT11 Sensor', category:'ARDUINO', price:80, image:'assets/arduino.jpg' },
    { name:'Photoresistor', category:'ARDUINO', price:10, image:'assets/arduino.jpg' },
    { name:'LCD 16x2 (I2C)', category:'ARDUINO', price:150, image:'assets/arduino.jpg' },
    { name:'7 Segment', category:'ARDUINO', price:20, image:'assets/arduino.jpg' },
    { name:'9V Battery', category:'ARDUINO', price:60, image:'assets/arduino.jpg' },
    { name:'Arduino Uno R3', category:'ARDUINO', price:250, image:'assets/arduino.jpg' },
    { name:'Breadboard Mini', category:'ARDUINO', price:50, image:'assets/arduino.jpg' },
    { name:'LEDs', category:'ARDUINO', price:10, image:'assets/arduino.jpg' },
    { name:'Arduino Mega 2560', category:'ARDUINO', price:500, image:'assets/arduino.jpg' },
    { name:'ESP32 C3 Mini', category:'ARDUINO', price:200, image:'assets/arduino.jpg' },
  ]);

  monitors = computed(() => this.products().filter(p => p.category === 'MONITOR'));
  keyboards = computed(() => this.products().filter(p => p.category === 'KEYBOARD'));
  pc = computed(() => this.products().filter(p => p.category === 'PC INTERNALS'));
  arduino = computed(() => this.products().filter(p => p.category === 'ARDUINO'));

  cart = signal<any[]>([]);

  addToCart(item:any){
  this.cart.update(cartItems => {

    const existing = cartItems.find(i => i.name === item.name);

    if(existing){
      return cartItems.map(i =>
        i.name === item.name
          ? { ...i, qty: (i.qty || 1) + 1 }
          : i
      );
    }

    return [...cartItems, { ...item, qty: 1 }];
  });
}

  total = computed(() =>
    this.cart().reduce((sum, item) => 
    sum + (item.price * (item.qty || 1)), 0)
  );

  apiUrl = 'http://localhost:3000/api/orders';

  saveOrder(data:any){
    return this.http.post(this.apiUrl, data);
  }

  getOrders(){
    return this.http.get<any[]>(this.apiUrl);
  }
}