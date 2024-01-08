import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AddProductsComponent } from '../../models/add-products/add-products.component';
import { PanelManagerService } from '../../shared/services/panel-manager.service';
import { AdminMainPanelComponent } from '../admin-main-panel/admin-main-panel.component';
import { CommonModule } from '@angular/common';
import { RemoveProductComponent } from '../../models/remove-product/remove-product.component';
import { EditProductComponent } from '../../models/edit-product/edit-product.component';
import { DeleteUserComponent } from '../../models/delete-user/delete-user.component';
import { ViewLogComponent } from '../../models/view-log/view-log.component';
import { ViewErrorComponent } from '../../models/view-error/view-error.component';

@Component({
	selector: 'app-admin-panel',
	standalone: true,
	imports: [AddProductsComponent, RemoveProductComponent, AdminMainPanelComponent, RouterOutlet, RouterLink, CommonModule,EditProductComponent,DeleteUserComponent,
	ViewLogComponent, ViewErrorComponent],
	templateUrl: './admin-panel.component.html',
	styleUrl: './admin-panel.component.scss',
	providers: [PanelManagerService]
})
export class AdminPanelComponent {

	constructor(private mainService: PanelManagerService) { }

	stringPage = "";


	insertPanel(action: string) {
		
		
		this.mainService.setAction(action)
	}

}