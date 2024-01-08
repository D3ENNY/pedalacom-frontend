import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerApiServiceService } from '../../shared/CRUD/customer-api-service.service';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../shared/dataModel/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [CustomerApiServiceService]
})
export class RegisterComponent {

  errorList: string[] = [];

  valueOK: boolean = true;

  remember: boolean = false;
  
  constructor( private registration : CustomerApiServiceService, private router: Router){}

  samePassword :boolean = false

  ngOnInit(){
    this.redirect()
  }

  checkValue(Title: string, FirstName: string, LastName: string, Email: string, PhoneNumber: string){
    this.valueOK = true;

    this.errorList = []

    if(Title == "Choose..."){
      this.valueOK = false;
      this.errorList.push("Devi scegliere almeno un titolo")
    }

    if(!FirstName.match("^([a-zA-Z\u00C0-\u00FF\s]{3,}\s?)+$")){
      this.valueOK = false;
      if(FirstName != ""){
        this.errorList.push("Il nome non è valido")
      }
    }
    

    if(!LastName.match("^([a-zA-Z\u00C0-\u00FF\s]{3,}\s?)+$")){
      this.valueOK = false;
      if(LastName != ""){
        this.errorList.push("Il cognome non è valido")
      }
    }

    if(!Email.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$")){
      this.valueOK = false;
      if(Email != ""){
        this.errorList.push("Email non valida")
      }
    }

    if(PhoneNumber.length < 10 || PhoneNumber.length > 13){
      this.valueOK = false;
      if(PhoneNumber != ""){
        this.errorList.push("Il numero di telefono non è valido")
      }
    }
  }
  
  PasswordCheck(password: string, checkPassword: string){
    this.errorList = []
    if(password === checkPassword && password != ''){
      this.samePassword = true;
    } else{
      this.samePassword = false;
      this.errorList.push("Le password non coincidono")
    }
  }

  redirect(){
    if(localStorage.getItem("username") || sessionStorage.getItem("username")){
      localStorage.setItem("register", "first_registration");
      this.router.navigate(['/']);
    }
  }

  checkControl(){
    this.remember = !this.remember
  }

  sendRegistration(title : string,firstName : string,middleName : string,lastName : string,email : string,password : string,companyName : string,phoneNumber : string){
    console.log("Ciao bello")
    let cst:  Customer =  new Customer() 
    cst = {
      Title : title ,
      FirstName  : firstName,
      MiddleName  : middleName,
      LastName  : lastName,
      EmailAddress  : email,
      PasswordHash  : password,
      CompanyName  : companyName,
      Phone  : phoneNumber,
    }
    this.registration.postCustomer(cst).subscribe((resp)=>{
      if(resp.status == 200 || resp.status == 201){
        this.registration.setLoggedToken(cst.EmailAddress, cst.FirstName, resp.body.customerId, this.remember)
        this.redirect()
      }else{
        console.log("non sei registrato")
      }
    });
  }
}
