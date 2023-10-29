import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  getAllProducts(){
   return this.http.get(environment.baseAPI + 'products')
  }
  getAllCategories(){
    return this.http.get(environment.baseAPI + 'products/categories')
   }
  getProductsByCategory(keyword:string){
    return this.http.get(environment.baseAPI + 'products/category/'+keyword)
   }
  
   getProductById(id:any){
    return this.http.get(environment.baseAPI + 'products/'+id)
   }
   createProduct(model:any){
    return this.http.post(environment.baseAPI + 'products' , model);
   }
}
