import { Component } from '@angular/core';
import { CustomerApiServiceService } from '../../../shared/CRUD/customer-api-service.service';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss',
  providers :[CustomerApiServiceService]
})
export class DeleteUserComponent {

  constructor (private customer : CustomerApiServiceService) { }

  deleteUser( email : string) {
    console.log(email)
    this.customer.deleteCustomer(email).subscribe({
      next:(data: any) => {
        console.log("account eliminato");
        console.log(data);
      },
      error : (err : any) => {
        console.log(err)
      }
    })
  }
}
