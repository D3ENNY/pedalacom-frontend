import { Component } from '@angular/core';
import { ProductApiService } from '../../../shared/CRUD/product-api-service.service';
import { infoProduct } from '../../../shared/dataModel/products';
import { TableComponent } from '../table/table.component';



@Component({
  selector: 'app-remove-product',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './remove-product.component.html',
  styleUrl: './remove-product.component.scss',
  providers : [ProductApiService]
})
export class RemoveProductComponent {

  constructor(private productApi : ProductApiService){}

  products : infoProduct [] = [];
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
        console.log(err)
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
        console.log(err)
      }
    })
  }

}
