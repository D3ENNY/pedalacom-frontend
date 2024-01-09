import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductApiService } from '../../../shared/CRUD/product-api-service.service';
import { ImageService } from '../../../shared/services/image-service.service';
import { Product } from '../../../shared/dataModel/products';
@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
  providers: [ProductApiService]
})

export class EditProductComponent {
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

  provaCambio(){
    this.showMessage = true
    this.okStatus = true;
  }

  sendProduct(Category: string, Name: string, Color: string, ProductNumber: string, ListPrice: string, StandardCost: string, Weight: string, Size: string){

    this.showMessage = true

    let newProduct: Product = new Product()

    newProduct = {
      name : Name,
      productNumber: ProductNumber,
      color: Color,
      standardCost : parseInt(StandardCost),
      listPrice : parseInt(ListPrice),
      size : Size,
      productCategoryId : parseInt(Category),
      thumbnailPhotoFileName: this.myImg,
      weight : parseInt(Weight),
      modifiedDate : new Date() 
    }

    console.log(newProduct)

    this.productService.postProducts(newProduct).subscribe({
      next: (data:any) => {
        this.okStatus = true; 
      },
      error: (err:any) =>{
        this.okStatus = false;
        console.log(err);
      }
    });
  }
}
