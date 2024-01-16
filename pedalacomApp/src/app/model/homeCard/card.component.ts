import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// IMPORT SERVICES
import { ImageService } from '../../shared/services/image-service.service';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  providers: [ImageService]
})
export class CardComponent {


  constructor(private imgService: ImageService) {
  }

  ngOnInit(): void {
    this.product.thumbNailPhoto = this.imgService.blobToUrl(this.product.thumbNailPhoto)
  }
  
  @Input() product: any;
  

  /* imgList: string[] = ["https://laciclisticamilano.it/wp-content/uploads/2022/01/La-Ciclistica-Milano-La-01-city-bike-bicicletta-urbana-bici-su-misura.png", "https://i.ebayimg.com/images/g/EFgAAOSwuE9fvOXd/s-l1200.jpg", "https://www.bcycles.it/4944-large_default/bicicletta-country-28-donna-6v-bianco-mercurius.jpg", "https://www.legnanobici.com/wp-content/uploads/2020/10/L500-1.jpg", "https://m.media-amazon.com/images/I/61GHiKhAABL._AC_UF1000,1000_QL80_.jpg"]

  imgRandom(): string{
    let randomImage = this.imgList[Math.floor(Math.random() * (4 - 0 + 1) + 0)]
    return randomImage
  } */
  
}