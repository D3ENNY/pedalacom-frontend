import { Component } from '@angular/core';
import { ProductApiService } from '../../../shared/CRUD/product-api-service.service';
import { TableComponent } from '../table/table.component';



@Component({
  selector: 'app-management-products',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './management-products.component.html',
  styleUrl: './management-products.component.scss',
  providers : [ProductApiService]
})
export class ManagementProductsComponent {

  constructor(private productApi : ProductApiService){}

  products : any [] = [];
  paginationInfo : any;
  totalPage: number = 49;
  page : number = 1;

  ngOnInit(){
    this.getProductByName("")
    
  }

  getProductByName(searchData : string){
    this.productApi.getProductByName(searchData, 1).subscribe({
      next: (data : any) =>{
        this.products = data.products
        if(data.paginationInfo)
					{
						this.paginationInfo = data.paginationInfo;
						this.totalPage = data.paginationInfo.totalPages;
					}
      },
      error: (err : any) => {
        console.error(err)
      }
    })
  }
  
  changePageByName(searchData : string, pageNumber : number){
    this.productApi.getProductByName(searchData, pageNumber).subscribe({
      next: (data : any) =>{
        this.products = data.products
        if(data.paginationInfo)
					{
						this.paginationInfo = data.paginationInfo;
						this.totalPage = data.paginationInfo.totalPages;
						data.paginationInfo.pageNumber = pageNumber;
					}
      },
      error: (err : any) => {
        console.error(err)
      }
    })
  }

}
