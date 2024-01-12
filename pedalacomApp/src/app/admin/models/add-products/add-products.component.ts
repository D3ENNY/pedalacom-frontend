import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductApiService } from '../../../shared/CRUD/product-api-service.service';
import { Product } from '../../../shared/dataModel/products';
import { ImageService } from '../../../shared/services/image-service.service';

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.scss',
  providers: [ProductApiService]
})
export class AddProductsComponent {
  constructor(private productService: ProductApiService, private imgService: ImageService){}

  myImg: string = '';
  okStatus: boolean = false;
  showMessage:boolean = false;

  getFile(event: any) {
		const img = event.target.files[0]
		this.imgService.imgToBlob(img).then((blob) => {
			return this.imgService.blobToBase64(blob)
		}).then((base64) => {
			this.myImg = base64
		})
	}

  sendProduct(Category: string, Name: string, Color: string, ProductNumber: string, ListPrice: string, StandardCost: string, Weight: string, Size: string, Description: string, Model: string){

    this.showMessage = true

    let newProduct: Product = new Product()

    newProduct = {
      productId: 0,
      name : Name,
      productNumber: ProductNumber,
      color: Color,
      standardCost : parseInt(StandardCost),
      listPrice : parseInt(ListPrice),
      size : Size,
      productCategoryId : parseInt(Category),
      thumbnailPhotoFileName: this.myImg,
      weight : parseInt(Weight),
      modifiedDate : new Date(), 
      SellStartDate : new Date()
    }
    console.log(newProduct);
    
    this.productService.postProducts(newProduct, [Model, Description]).subscribe({
      next: (data:any) => {
        this.okStatus = true; 
        console.log("test", data);
      },
      error: (err:any) =>{
        this.okStatus = false;
        console.log(err);
      }
    });
  }
}
