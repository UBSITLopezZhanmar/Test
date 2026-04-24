import { Component, inject, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  service = inject(StoreService);
  orders:any[] = [];
  editingId: string | null = null;
  editData: any = {};

  ngOnInit(){
    this.loadOrders();
  }

  buy(item:any){
    const data = {
      category: item.category,
      name: item.name,
      price: item.price,
      quantity: item.qty || 1,
      image: item.image
    };

    this.service.saveOrder(data).subscribe(() => {
      this.service.cart.update(cartItems =>
        cartItems.filter(i => i.name !== item.name)
      );
      
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
    this.service.getOrders().subscribe(data => {
      this.orders = data;
    });
  }

  updateQty(item:any){
    if(item.qty < 1){
      item.qty = 1;
    }

    this.service.cart.update(c => [...c]);
  }

  cancelOrder(id: string){
    if(confirm("Cancel this order?")){
      this.service.deleteOrder(id).subscribe(() => {
        this.loadOrders();
      });
    }
  }

  startEdit(order:any){
    this.editingId = order._id;
    this.editData = { ...order };
  }

  saveEdit(){
    this.service.updateOrder(this.editingId!, this.editData)
      .subscribe(() => {
        this.editingId = null;
        this.loadOrders();
    });
  }

  cancelEdit(){
    this.editingId = null;
  }
}