import { Component, TemplateRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ProductsCardComponent } from '../../model/productsCard/products-card.component';
import { ProductApiServiceService } from '../../shared/CRUD/product-api-service.service';
import { Product } from '../../shared/dataModel/products';

@Component({
	selector: 'app-products',
	standalone: true,
	imports: [CommonModule, NgbModule, ProductsCardComponent],
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss'],
	providers: [ProductApiServiceService]
})
export class ProductsComponent {

	products:Product[] = [];
	
	constructor(private productService: ProductApiServiceService) {
	}

	GetProducts() {
		this.productService.getProducts().subscribe({
			next: (data:any) => {
				this.products = data;
				console.log(this.products);
			},
			error: (err:any) => {
				console.log(err)
			}
		})
	}

	ngOnInit(): void {
		//Called after the constructor, initializing input properties, and the first call to ngOnChanges.
		//Add 'implements OnInit' to the class.
		this.GetProducts();
	}

	[x: string]: any;
	private offcanvasService = inject(NgbOffcanvas);
	isOffcanvasOpen: boolean = false;

	valueFilter: string = 'Prezzo: In ordine crescente'
	btnID: string = ''
	page: number = 1;
	totalPage: number = 49;
	search: string = 'biciclette'

	categoryList = [
		{ data: "Bikes", ita: "Biciclette" },
		{ data: "Mountain Bikes", ita: "Mountain Bikes" },
		{ data: "Road Bikes", ita: "Bici da strada" },
		{ data: "Touring Bikes", ita: "Bici da turismo" }
	]

	accessoriesList = [
		{ data: "Accessories", ita: "Accessori" },
		{ data: "Bike Stands", ita: "Portabici" },
		{ data: "Bottles and Cages", ita: "Borraccia & Porta borraccia" },
		{ data: "Cleaners", ita: "kit di pulizia" },
		{ data: "Locks", ita: "Lucchetti" },
		{ data: "Lights", ita: "Luci" },
		{data: "Pumps", ita: "Pompe"}
	]

	clothingsList = [
		{ data: "Clothing", ita: "Vestiti" },
		{ data: "Bib-Shorts", ita: "Pantaloncini con bretelle" },
		{ data: "Gloves", ita: "Guanti" },
		{ data: "Headsets", ita: "Cuffie" },
		{ data: "Helmets", ita: "Caschi" },
		{ data: "Hydration Packs", ita: "Zaini idrici" },
		{ data: "Jerseys", ita: "Maglie" },
		{ data: "Panniers", ita: "Borse laterali" },
		{ data: "Shorts", ita: "Pantaloncini" },
		{ data: "Socks", ita: "Calze" },
		{ data: "Tights", ita: "Collant" },
		{ data: "Vests", ita: "Gillet" }
	]

	componentsList = [
			{data: "Components", ita: "Componenti"},
			{data: "Bottom Brackets", ita: "Staffe inferiori"},
			{data: "Brakes", ita: "Freni"},
			{data: "Caps", ita: "Tappi"},
			{data: "Chains", ita: "Catene"},
			{data: "Guarniture", ita: "Guarniture"},
			{data: "Derailleurs", ita: "Deragliatori"},
			{data: "Fenders", ita: "Parafanghi"},
			{data: "Forks", ita: "Forcelle"},
			{data: "Handlebars", ita: "Manubri"},
			{data: "Pedals", ita: "Pedali"},
			{data: "Saddles", ita: "Selle"},
			{data: "Wheels", ita: "Cerchioni"},
			{data: "Tires and Tubes", ita: "pneumatici e budelli"},
			{data: "Touring Frames", ita: "Telai da turismo"},
			{data: "Road Frames", ita: "Telai da strada"},
			{data: "Mountain Frames", ita: "Telai da mountain bike"}
	]

	open(content: TemplateRef<any>) {

		this.offcanvasService.open(content, { position: 'bottom', ariaLabelledBy: 'offcanvas-basic-title' }).result.then(
			(result) => {
				this.toggleIcon()
			},
			(reason) => {
				this.toggleIcon()
			},
		);
		this.toggleIcon()
	}

	close() {
		this.offcanvasService.dismiss()
	}

	toggleIcon() {
		this.isOffcanvasOpen = !this.isOffcanvasOpen;
	}

	mobileFilterData(btn: HTMLButtonElement, id: string) {
		this.valueFilter = btn.value
		this.btnID = id
		console.log(this.btnID);
		
	}

}