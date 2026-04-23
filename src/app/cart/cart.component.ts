import { Component, inject, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  service = inject(StoreService);
  orders:any[] = [];

  ngOnInit(){
    this.loadOrders();
  }

  buy(item:any){
    const data = {
      category: item.category,
      name: item.name,
      price: item.price,
      quantity: item.qty || 1
    };

    this.service.saveOrder(data).subscribe(() => {
      alert("Order placed!");
      this.loadOrders();
    });
  }

  remove(item:any){
    this.service.cart.update(cartItems =>
    cartItems.filter(i => i !== item)
  );
  }

  loadOrders(){
    this.service.getOrders().subscribe(data => this.orders = data);
  }

  updateQty(item:any){
  if(item.qty < 1){
    item.qty = 1;
  }

  this.service.cart.update(c => [...c]);
}
}