import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogApiServiceService } from '../../../shared/CRUD/log-api-service.service';
// IMPORT DATA MODEL
import { LogError } from '../../../shared/dataModel/logError';

@Component({
  selector: 'app-view-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-error.component.html',
  styleUrls: ['./view-error.component.scss'],
  providers: [LogApiServiceService]
})
export class ViewErrorComponent {

  logErrors: LogError[] = [];
  paginationInfo : any;
  totalPage: number = 49;
  pageNumber : number = 1;
  page: number = 1;

  constructor(private logErrorService: LogApiServiceService) {}

  ngOnInit() {
    this.getErrors(this.pageNumber);
  }

  getErrors(pageNumber : number) {
    this.logErrorService.getLogErrors().subscribe({
      next: (data : any) =>{
        this.logErrors = data.errorLog;
        if(data.paginationInfo)
            {
              this.paginationInfo = data.paginationInfo;
              this.totalPage = data.paginationInfo.totalPages;
            }
        console.log(data)
      }, 
      error: (err : any) => {
      console.log(err)
      } 
    });
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
    this.getErrors(page)
  }
  
}
