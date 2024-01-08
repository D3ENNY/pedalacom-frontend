import { Component, Input } from '@angular/core';
import { infoProduct } from '../../shared/dataModel/products';
import { CommonModule } from '@angular/common';
import { RemoveProductComponent } from '../../admin/models/remove-product/remove-product.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule,RemoveProductComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  constructor(private removeProduct : RemoveProductComponent){}
  @Input () products : infoProduct[] = [];
  @Input () paginationInfo : any;
  page: number = 1;
	totalPage: number = 49;
	pageNumber : number = 1;
  searchData= '';

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
		    this.removeProduct.getProductByName(searchData, page)
			}
}
