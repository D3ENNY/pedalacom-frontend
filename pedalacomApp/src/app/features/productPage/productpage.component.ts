import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../../shared/dataModel/cart';
// import Services
import { ProductApiService } from '../../shared/CRUD/product-api-service.service';
import { ImageService } from '../../shared/services/image-service.service';
import { CartApiServiceService } from '../../shared/CRUD/cart-api-service.service';
import { SalesSectionComponent } from '../../model/SalesSection/SalesSection.component';

@Component({
  selector: 'app-bikepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productpage.component.html',
  styleUrl: './productpage.component.scss',
  providers: [ProductApiService, ImageService, CartApiServiceService]

})
export class ProductPageComponent {

  productData: any;

  constructor(private route: ActivatedRoute, private cartService: CartApiServiceService,private productService: ProductApiService, private imgService: ImageService) { }

  ngOnInit() {
    this.fetchProductData();
  }


  sendCart(){
    let newCart : Cart = new Cart()
    var valuer: number

    if(sessionStorage.getItem('id') != null){
      valuer = Number(sessionStorage.getItem('id'))
    }else if(localStorage.getItem('id') != null){
      valuer = Number(localStorage.getItem('id'))
    }else{
      return console.log("error")
    }

    newCart = {
      CustomerId: valuer,
      ProductId: this.productData.productId,
      Quantity:1
    }
  
    this.cartService.postCart(newCart).subscribe({
      next:(data:any) => {
        console.log(data)
      },
      error:(err:Error)=>{
        console.error(err)
      }
    })
    
  }

  private fetchProductData() {
    this.route.params.subscribe(params => {
      const productId = +params['productId'];

      if (!isNaN(productId)) {
        this.productService.getProductById(productId).subscribe({
          next: productData => {
            this.productData = productData;
            this.productData.thumbNailPhoto = this.imgService.blobToUrl(this.productData.thumbNailPhoto)
          },
          error: err => {
            console.error('Error fetching product:', err);
          }
        });
      } else {
        console.error('Invalid productId:', params['productId']);
      }
    });
  }

}
