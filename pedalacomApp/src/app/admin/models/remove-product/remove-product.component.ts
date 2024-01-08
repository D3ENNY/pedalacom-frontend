import { Component } from '@angular/core';
import { ProductApiService } from '../../../shared/CRUD/product-api-service.service';
import { infoProduct } from '../../../shared/dataModel/products';
import { TableComponent } from '../../../model/table/table.component';

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
  page = 1;

  ngOnInit(){
    this.getProductByName("", this.page)
  }
  

  getProductByName(searchData : string, pageNumber : number){
    this.productApi.getProductByName(searchData).subscribe({
      next: (data : any) =>{
        this.products= data['products']
        this.paginationInfo = data['paginationInfo']
        if(data.paginationInfo)
					{
            console.log(data)
						this.paginationInfo = data.paginationInfo;
						this.totalPage = data.paginationInfo.totalPages;
						this.page = data.paginationInfo.pageNumber;
					}
      },
      error: (err : any) => {
        console.log(err)
      }
    })
  }
  
}
