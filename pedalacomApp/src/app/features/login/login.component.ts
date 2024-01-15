import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerApiServiceService } from '../../shared/CRUD/customer-api-service.service';
import { Router, RouterModule } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [CustomerApiServiceService]
})
export class LoginComponent {

  
  needNewRegistration = false;

  setDisplay = "none";

  userFound = "none"

  constructor (private loginService: CustomerApiServiceService, private router: Router) {}

  remember: boolean = false;

  runLogin(event: Event, email: string, password: string) 
  {
    this.needNewRegistration = false
    this.setDisplay = "none"
    this.userFound = "none"
    this.loginService.loginCustomer(email, password).subscribe({
      next:(data: any) => {
        this.loginService.setLoggedToken(email, data.body.firstName, data.body.customerId, this.remember)
        window.location.reload();
        this.redirect()
      },
      error: (err: any)=>{
        console.log(err.error)
        if(err.error == "wrong password"){
          this.setDisplay = "block";
        } else if (err.error == "user not found"){
          this.userFound = "block";
        } else if (err.error == "user already exist"){
          this.needNewRegistration = true
        }
      }
    })
    event.preventDefault()
  }

  checkControl(){
    this.remember = !this.remember
  }

  redirect(){
    if(localStorage.getItem("username") || sessionStorage.getItem("username")){
      localStorage.setItem("login", "first_access");
      this.router.navigate(['/']);
    }
  }

  ngOnInit(){
    this.redirect()
  }
}