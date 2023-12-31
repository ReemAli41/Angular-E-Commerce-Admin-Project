import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  carts : any[] = [];
  form !: FormGroup ;
  total = 0;
  products :any[] = [];
  details : any;
  constructor(private service: CartService , private build: FormBuilder , private productService:ProductsService){}
  ngOnInit(): void {
    this.form = this.build.group({
      start : [''],
      end : ['']
    })
    this.getAllCarts();
  }
  getAllCarts(){
    this.service.getAllCarts().subscribe((res : any) => {
      this.carts = res;
    })
  }
  applyFilter(){
    let date = this.form.value;
    this.service.getAllCarts(date).subscribe((res : any) => {
      this.carts = res
    })
    console.log(this.form.value);
  }
  deleteCart(id:number){
     this.service.deleteCart(id).subscribe(res => {
      this.getAllCarts();
      alert("Cart Deleted Success!");
     })
  }
  view(index:number){
    this.products = [];
     this.details = this.carts[index];
     for(let x in this.details.products){
      this.productService.getProductById(this.details.products[x].productId).subscribe(res => {
        this.products.push({item: res , quantity: this.details.products[x].quantity});
      })
     }
     //console.log(this.details);
  }
  
  
  
}
