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

  productEdit : any = {
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
    model: '', 
    desc: '',
    modelId: 0,
    descId: 0
  }

  getFile(event: any) {
		const img = event.target.files[0]
		this.imgService.imgToBlob(img).then((blob) => {
			return this.imgService.blobToBase64(blob)
		}).then((base64) => {
			this.myImg = base64
		})
	}

  postProduct(Category: string, Name: string, Color: string, ProductNumber: string, ListPrice: string, StandardCost: string, Weight: string, Size: string, Desc: string, Model: string){
    let newProduct: Product = new Product()
    
    newProduct = {
      productId : this.productId,
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
      SellStartDate: new Date(),
      ProductModelId: this.productEdit.modelId,
    }

    this.productService.putProducts(this.productId, this.productEdit.descId, newProduct, Desc, Model).subscribe({
      next: (data:any) => {
        this.okStatus = true; 
      },
      error: (err:any) =>{
        this.okStatus = false;
        console.error("errore", err);
      }
    });
    /*
    this.showMessage = true
    this.okStatus = true;
    */
  }

  getProductByID(productId: number){

    this.productService.getProductById(productId).subscribe({
      next: (data:any) => {
        this.modaleId = productId.toString()
        this.myImg = data.thumbNailPhoto
        console.log(data);
        
        this.productEdit = {
          name: data.name,
          productNumber:data.productNumber,
          color:data.color,
          standardCost: data.standardCost,
          listPrice: data.listPrice,
          size: data.size,
          weight:data.weight,
          productCategoryId:data.productCategoryId,
          thumbNailPhoto: this.imgService.blobToUrl(data.thumbNailPhoto),
          modifiedDate:new Date(),
          desc: data.productModel.productModelProductDescriptions[0].productDescription.description,
          model: data.productModel.name,
          modelId: data.productModel.productModelId,
          descId: data.productModel.productModelProductDescriptions[0].productDescription.productDescriptionId
        }
      },
      error: (err:Error) => {
        console.error(err)
      }
    })
  }

  
}
