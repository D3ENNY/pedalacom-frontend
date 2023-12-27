import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AddProductsComponent } from '../../models/add-products/add-products.component';
import { PanelManagerService } from '../../shared/services/panel-manager.service';
import { AdminMainPanelComponent } from '../admin-main-panel/admin-main-panel.component';

@Component({
	selector: 'app-admin-panel',
	standalone: true,
	imports: [AddProductsComponent, AdminMainPanelComponent, RouterOutlet, RouterLink],
	templateUrl: './admin-panel.component.html',
	styleUrl: './admin-panel.component.scss',
	providers: [PanelManagerService]
})
export class AdminPanelComponent {

	constructor(private mainService: PanelManagerService) { }

	insertPanel(action: string) {
		console.log("entrato");
		
		this.mainService.setAction(action)
	}

}