import { ImageService } from './../../shared/services/image-service.service';
import { Product } from './../../shared/dataModel/products';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Router } from '@angular/router';
// IMPORT CUSTOM COMPONENTS
import { CarouselComponent } from '../../model/carousel/carousel.component';
import { CardComponent } from '../../model/homeCard/card.component';
import { SalesSectionComponent } from '../../model/SalesSection/SalesSection.component';
// IMPORT SERVICES
import { ProductApiService } from '../../shared/CRUD/product-api-service.service';
import { infoProduct } from '../../shared/dataModel/products';


@Component({
	selector: 'app-home',
	standalone: true,
	imports: [SlickCarouselModule, CommonModule, CarouselComponent, SalesSectionComponent, CardComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	providers: [ProductApiService]
})
export class HomeComponent {

	constructor(private ProductService: ProductApiService, private imgService: ImageService, private router: Router) { }

	ngOnInit() {

		if (localStorage.getItem("login") === "first_access") {
			this.firstAccess = true
			localStorage.removeItem("login")
		} else if (localStorage.getItem("register") === "first_registration") {
			this.firstRegistration = true
			localStorage.removeItem("register")
		}

		this.getProductCard()
		
	}

	firstAccess: boolean = false;
	firstRegistration: boolean = false;
	products: infoProduct[] = []

	slideConfig = {
		dots: false,
		infinite: false,
		speed: 300,
		slidesToShow: 4,
		slidesToScroll: 4,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: false,
					dots: false
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		]
	}

	getProductCard() {
		this.ProductService.getProducts().subscribe({
		  next: (data: any) => {
			console.log('Products data:', data);
			this.products = data;
		  },
		  error: (err: any) => {
			console.error('Error fetching products:', err);
		  },
		  complete: () => {
			console.log('Product retrieval completed.');
		  }
		});
	}
	  
	navigateToProductPage(productId: number) {
		this.router.navigate(['/product', productId])
	} 
	
}

