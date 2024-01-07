import { Component, TemplateRef, inject, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ProductsCardComponent } from '../../model/productsCard/products-card.component';
import { ProductApiService } from '../../shared/CRUD/product-api-service.service';
import { infoProduct } from '../../shared/dataModel/products';
import { ImageService } from '../../shared/services/image-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-products',
	standalone: true,
	imports: [CommonModule, NgbModule, ProductsCardComponent],
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss'],
	providers: [ProductApiService, ImageService]
})
export class ProductsComponent {

	searchData : string = "";
	filterParams : any[] = [];
	myImg: any
	filterView: string[] = [] 
	products: infoProduct[] = [];
	isOffcanvasOpen: boolean = false;
	valueFilter: string = 'Prezzo: In ordine crescente'
	btnID: string = ''
	page: number = 1;
	totalPage: number = 49;

	constructor(
		private productService: ProductApiService, 
		private imgService: ImageService, 
		private offcanvasService: NgbOffcanvas, 
		private route : ActivatedRoute
	) { }
	
	ngOnInit(): void {

		this.route.paramMap.subscribe(params => {
			const param = params.get('searchParam');
			if(param) this.searchData = param
		})

		this.GetProducts(this.searchData, this.filterParams)

	}

	populateFilterView(str: string){
		if(this.filterView.includes(str))
			this.filterView.splice(this.filterParams.indexOf(str), 1)
		else this.filterView.push(str)

		console.log("filterView", this.filterView);
		
	}

	populateFilter(param : string){
		let obj : any = {"categoryName" : param}
		if (this.filterParams.find(x => x.categoryName === obj.categoryName))
			this.filterParams.splice(this.filterParams.findIndex(x => x.categoryName === obj.categoryName),1)
		else this.filterParams.push(obj)

		this.GetProducts(this.searchData, this.filterParams)
	}
	
	open(content: TemplateRef<any>) {

		this.offcanvasService.open(content, { position: 'bottom', ariaLabelledBy: 'offcanvas-basic-title' }).result.then(
			(result) => this.toggleIcon(),
			(reason) => this.toggleIcon(),
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
	}

	GetProducts(searchData : string, filterParams : any) {

		const productObservable = filterParams && filterParams.length > 0 ?
			this.productService.getProductFiltered(searchData, filterParams) :
			this.productService.getProductFiltered(searchData);

		console.log(searchData, filterParams);
		
		productObservable.subscribe({
			next: (data: infoProduct[]) => {

				data.forEach(e => e.photo = this.imgService.blobToUrl(e.photo))

				this.products = data;
				
			},
			error: (err: any) => {
				console.error(err)
			}
		})
	}
  
	getFile(event: any) {
		const img = event.target.files[0]
		this.imgService.imgToBlob(img).then((blob) => {
			return this.imgService.blobToBase64(blob)
		}).then((base64) => this.myImg = this.imgService.blobToUrl(base64.split(",")[1]))
	}

	categoryList = [
		{ data: "Mountain Bikes", ita: "Mountain Bikes" },
		{ data: "Road Bikes", ita: "Bici da strada" },
		{ data: "Touring Bikes", ita: "Bici da turismo" }
	]

	accessoriesList = [
		{ data: "Bike Stands", ita: "Portabici" },
		{ data: "Bottles and Cages", ita: "Borraccia & Porta borraccia" },
		{ data: "Cleaners", ita: "kit di pulizia" },
		{ data: "Locks", ita: "Lucchetti" },
		{ data: "Lights", ita: "Luci" },
		{ data: "Pumps", ita: "Pompe" }
	]

	clothingsList = [
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
		{ data: "Bottom Brackets", ita: "Staffe inferiori" },
		{ data: "Brakes", ita: "Freni" },
		{ data: "Caps", ita: "Tappi" },
		{ data: "Chains", ita: "Catene" },
		{ data: "Guarniture", ita: "Guarniture" },
		{ data: "Derailleurs", ita: "Deragliatori" },
		{ data: "Fenders", ita: "Parafanghi" },
		{ data: "Forks", ita: "Forcelle" },
		{ data: "Handlebars", ita: "Manubri" },
		{ data: "Pedals", ita: "Pedali" },
		{ data: "Saddles", ita: "Selle" },
		{ data: "Wheels", ita: "Cerchioni" },
		{ data: "Tires and Tubes", ita: "pneumatici e budelli" },
		{ data: "Touring Frames", ita: "Telai da turismo" },
		{ data: "Road Frames", ita: "Telai da strada" },
		{ data: "Mountain Frames", ita: "Telai da mountain bike" }
	]

}