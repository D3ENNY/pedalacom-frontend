import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// IMPORT SERVICES
import { infoProduct } from '../../shared/dataModel/products';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  constructor() {
    this.product = new infoProduct();
  }

  @Input() product: infoProduct;
  
}