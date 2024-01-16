import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSales } from '../../../shared/dataModel/productSales';
import { LogApiServiceService } from '../../../shared/CRUD/log-api-service.service';
// npm install chart.js --save
// npm install ng2-charts --save

@Component({
  selector: 'app-view-log',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-log.component.html',
  styleUrl: './view-log.component.scss',
  providers: [LogApiServiceService]
})
export class ViewLogComponent {

  producsSales: ProductSales[] = [];
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels: string[] = [];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData: any[] = [];

  constructor(private productSalesService: LogApiServiceService) {}

  ngOnInit() {
    this.getSalesDetails();
  }

  getSalesDetails() {
    this.productSalesService.getProductsSales().subscribe({
      next: (data : any) =>{
        this.producsSales = data;
        console.log(data)
      }, 
      error: (err : any) => {
      console.log(err)
      } 
    });
  }

}
