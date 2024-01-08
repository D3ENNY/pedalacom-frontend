import { Component, OnInit } from '@angular/core';
import { PanelManagerService } from '../../shared/services/panel-manager.service';
import { AddProductsComponent } from '../../models/add-products/add-products.component';

@Component({
  selector: 'app-admin-main-panel',
  standalone: true,
  imports: [],
  templateUrl: './admin-main-panel.component.html',
  styleUrl: './admin-main-panel.component.scss'
})
export class AdminMainPanelComponent implements OnInit {
  currentComponent: any;

  constructor(private mainService: PanelManagerService) { }

  ngOnInit() {
    this.mainService.action$.subscribe((action) => {
      switch (action) {
        case 'addProducts':
          this.currentComponent = AddProductsComponent;
          break;
        case 'removeProducts':
          this.currentComponent = AddProductsComponent;
          break;
        case 'editProducts':
          this.currentComponent = AddProductsComponent;
          break;
        case 'removeUser':
          this.currentComponent = AddProductsComponent;
          break;
        case 'viewLow':
          this.currentComponent = AddProductsComponent;
          break;
        case 'viewAppError':
          this.currentComponent = AddProductsComponent;
          break;
      }
    })
    
  }
}
