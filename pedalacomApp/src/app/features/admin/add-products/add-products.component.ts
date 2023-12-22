import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductApiServiceService } from '../../../shared/CRUD/product-api-service.service';
import { Product } from '../../../shared/dataModel/products';


@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.scss',
  providers: [ProductApiServiceService]
})
export class AddProductsComponent {
  constructor(private productService: ProductApiServiceService){}

  sendProduct(Category: string, Name: string, Color: string, ProductNumber: string, ListPrice: string, StandardCost: string, ThumbNailPhoto: string, Weight: string, Size: string){

    let newProduct: Product = new Product()

    newProduct = {
      name : Name,
      productNumber: ProductNumber,
      color: Color,
      standardCost : parseInt(StandardCost),
      listPrice : parseInt(ListPrice),
      size : Size,
      productCategoryId : parseInt(Category),
      thumbnailPhotoFileName: ThumbNailPhoto,
      weight : parseInt(Weight),
      modifiedDate : new Date() 
    }

    console.log(newProduct)

    this.productService.postProducts(newProduct).subscribe((resp)=>{
      if(resp.status == 200 || resp.status == 201){
        console.log("ok")
      }
      else{
        console.log("Problema")
      }
    });
  }
}
