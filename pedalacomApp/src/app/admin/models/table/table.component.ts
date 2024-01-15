import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementProductsComponent } from '../management-products/management-products.component';
import { ProductApiService } from '../../../shared/CRUD/product-api-service.service';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, ManagementProductsComponent, EditProductComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [ProductApiService]
})
export class TableComponent {
  
  constructor(private managementProducts : ManagementProductsComponent, private productApi : ProductApiService){}
  @Input () products : any[] = [];
  @Input () paginationInfo : any;
  @Input () searchData : string = '';
  page: number = 1;
  totalPage: number = 49;
  pageNumber : number = 1;
  modaleDelete : boolean = false;
  modalProduct : any = {
    productId : 0,
    productName : '',
    productCode : '',
  }
  
  
  
  ngOnInit(){
    this.getPages();
  }
  getPages(): number[] {
    const { pageNumber, totalPages } = this.paginationInfo || {};
    
    if (!pageNumber || !totalPages) {
      return [];
    }
    this.pageNumber = this.paginationInfo.pageNumber;
    const allPages = Array.from({ length: totalPages }, (_, i) => i + 1);
    let start = Math.max(1, pageNumber - 2);
    let end = Math.min(totalPages, pageNumber + 2);
    
    if (pageNumber <= 2) {
      // Se siamo nelle prime due pagine, visualizza le prime 5 pagine
      end = Math.min(5, totalPages);
    } else if (pageNumber >= totalPages - 1) {
      // Se siamo nelle ultime due pagine, visualizza le ultime 5 pagine
      start = Math.max(1, totalPages - 4);
    }
    
    return allPages.slice(start - 1, end);
  }
  
  
  changePage(page: number): void {
    if (!this.paginationInfo || !this.paginationInfo.pageNumber || !this.paginationInfo.totalPages) {
      console.error("Le informazioni sulla paginazione non sono valide.", this.paginationInfo);
      return;
    }
    const { searchData } = this;
    this.managementProducts.changePageByName(searchData, page)
  }
  
  deleteProduct(productId : string){
    this.productApi.deleteProducts(productId).subscribe({
      next : (data : any) => {

      },
      error : (err : any) => {
        console.error(err)
      }
    })
  }
}
