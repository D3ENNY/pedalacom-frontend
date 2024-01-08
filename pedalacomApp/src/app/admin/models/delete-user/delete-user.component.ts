import { Component } from '@angular/core';
import { CustomerApiServiceService } from '../../../shared/CRUD/customer-api-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss',
  providers :[CustomerApiServiceService]
})
export class DeleteUserComponent {

  constructor (private customer : CustomerApiServiceService) { }

  userDelete = false;

  userError = false;

  userEmail:string =  '';

  changeEmail(email: string){
    this.userEmail = email;
  }

  deleteUser( email : string) {
    console.log(email)
    this.userError = false;
    this.userDelete = false;
    this.customer.deleteCustomer(email).subscribe({
      next:(data: any) => {
        console.log("account eliminato");
        console.log(data);
        this.userDelete = true;
      },
      error : (err : any) => {
        console.log(err)
        this.userError = true;
      }
    })
  }
}
