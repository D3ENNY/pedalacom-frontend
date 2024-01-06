import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductApiService } from '../../shared/CRUD/product-api-service.service';


@Component({
  selector: 'app-bikepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productpage.component.html',
  styleUrl: './productpage.component.scss',
  providers: [ProductApiService]

})
export class ProductPageComponent {

  productData: any;

  constructor(private route: ActivatedRoute, private productService: ProductApiService) { }

  ngOnInit() {
    const productId = +this.route.snapshot.params['productId'];

    this.productService.getProductById(productId).subscribe(productData => {
      this.productData = productData;
      console.log(this.productData);
    });
  }
}
