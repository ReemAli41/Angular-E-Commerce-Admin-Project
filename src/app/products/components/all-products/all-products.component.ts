import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  products : Product[] = [] ;
  categories : string[] = [];
  loading : boolean = false;
  cartProduct : any[] = [];
  base64 : any = '';
  form !: FormGroup;
  constructor(private service:ProductsService , private build:FormBuilder){}
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.form=this.build.group({
      title: ['' , [Validators.required]],
      price: ['' , [Validators.required]],
      description: ['' , [Validators.required]],
      image: ['' , [Validators.required]],
      category: ['' , [Validators.required]]
    })
  }
  getProducts(){
      this.loading = true;
      this.service.getAllProducts().subscribe((res:any) => {
      this.products=res;
      //console.log(res);
      this.loading = false;
    }, error => {
      this.loading = false;
      alert(error)
    }   )
  }
  
  getCategories(){
    this.loading = true;
    this.service.getAllCategories().subscribe((res:any) => {
    console.log(res)
    this.categories=res;
    //console.log(res);
    this.loading = false;
  }, error => {
    this.loading = false;
    alert(error)
  }   )
}

filterCategory(event:any){
  let value = event.target.value; //detect change
  //console.log(value)
  if(value == "all"){
    this.getProducts()
  }else{
    this.getProductsCategory(value);
  }
}
getProductsCategory(keyword:string){
  this.loading = true;
  this.service.getProductsByCategory(keyword).subscribe((res:any) => {
    this.products = res;
    this.loading = false;

  })
}

addToCart(event:any){
  //console.log(event); 
  if("cart" in localStorage){
    this.cartProduct = JSON.parse(localStorage.getItem("cart")!)
    let exist = this.cartProduct.find(item => item.item.id == event.item.id);
    if(exist){
      alert("Product is already in your cart")
    }else{
      this.cartProduct.push(event);
      localStorage.setItem("cart", JSON.stringify(this.cartProduct));
    }
    
  }else{
    this.cartProduct.push(event);
    localStorage.setItem("cart", JSON.stringify(this.cartProduct));
  }
}

getImagePath(event:any){
  //using base 64 to turn image to link
  const file = event. target. files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
   this.base64 = reader.result;
   this.form.get('image')?.setValue(this.base64);

  };

}
getSelectedCategory(event:any){
  this.form.get('category')?.setValue(event.target.value);
  console.log(this.form);
}

addProduct(){
  const model = this.form.value;
  this.service.createProduct(model).subscribe(res => {
    alert("The product has been added successfully!")
  })
  console.log(this.form);
}

////////////////

update(item:any){
  this.form.get('title')?.setValue(item.title);
  this.form.get('description')?.setValue(item.description);
  this.form.get('category')?.setValue(item.category);
  this.form.get('price')?.setValue(item.price);
  this.form.get('image')?.setValue(item.image);
  this.base64 = item.image;


}


}


