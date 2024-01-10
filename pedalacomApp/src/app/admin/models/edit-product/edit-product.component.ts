import { Component, Input } from '@angular/core';
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

  @Input () productId: number = 0

  modaleId : string = '';
  myImg: string = '';
  okStatus: boolean = false;
  showMessage:boolean = false;
  product: any;

  productTry : any = {
    name: '',
    productNumber:'',
    color:'',
    standardCost: 0,
    listPrice: 0,
    size: '',
    weight: 0,
    productCategoryId:0,
    thumbnailPhotoFileName: '',
    modifiedDate:new Date(),
  }

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

  getProductByID(productId: number){

    this.productService.getProductById(productId).subscribe({
      next: (data:any) => {
        this.modaleId = productId.toString()
        console.log(this.modaleId)
        this.productTry = {
          name: data.name,
          productNumber:data.productNumber,
          color:data.color,
         standardCost: data.standardCost,
        listPrice: data.listPrice,
    size: data.size,
    weight:data.weight,
    productCategoryId:data.productCategoryID,
    thumbnailPhotoFileName: data.thumbnailPhotoFileName,
    modifiedDate:new Date(),
        }
       
        
        console.log(this.productTry)
      },
      error: (err:Error) => {
        console.log(err)
      }
    })
  }

  
}
