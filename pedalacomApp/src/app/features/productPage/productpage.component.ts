import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// import Services
import { ProductApiService } from '../../shared/CRUD/product-api-service.service';
import { ImageService } from '../../shared/services/image-service.service';


@Component({
  selector: 'app-bikepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productpage.component.html',
  styleUrl: './productpage.component.scss',
  providers: [ProductApiService, ImageService]

})
export class ProductPageComponent {

  productData: any;

  constructor(private route: ActivatedRoute, private productService: ProductApiService, private imgService: ImageService) { }

  ngOnInit() {
    this.fetchProductData();
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
