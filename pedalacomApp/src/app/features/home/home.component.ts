import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// IMPORT CUSTOM COMPONENTS
import { CarouselComponent } from '../../model/carousel/carousel.component';

import { CardComponent } from '../../model/homeCard/card.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SalesSectionComponent } from '../../model/salesSection/SalesSection.component';
// IMPORT SERVICES
import { ProductApiServiceService } from '../../shared/CRUD/product-api-service.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SlickCarouselModule,CommonModule, CarouselComponent, SalesSectionComponent, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [ProductApiServiceService]
})
export class HomeComponent {

  firstAccess: boolean = false;
  firstRegistration: boolean = false;


  ngOnInit(){
    console.log(localStorage.getItem("register"))
    if(localStorage.getItem("login") === "first_access"){
      this.firstAccess = true
      localStorage.removeItem("login")
    }else if (localStorage.getItem("register") === "first_registration"){
      this.firstRegistration = true
      localStorage.removeItem("register")
    }
  }
  slides = [
    {img: "http://placehold.it/350x150/000000"},
    {img: "http://placehold.it/350x150/111111"},
    {img: "http://placehold.it/350x150/333333"},
    {img: "http://placehold.it/350x150/666666"},
    {img: "http://placehold.it/350x150/000000"},
    {img: "http://placehold.it/350x150/111111"},
    {img: "http://placehold.it/350x150/333333"},
    {img: "http://placehold.it/350x150/666666"},
    {img: "http://placehold.it/350x150/000000"},
    {img: "http://placehold.it/350x150/111111"},
    {img: "http://placehold.it/350x150/333333"},
    {img: "http://placehold.it/350x150/666666"}
  ]
  ;

  slideConfig = {
    dots:false,
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
};
 
}

