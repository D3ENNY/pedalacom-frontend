import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationExtras, RouterModule } from '@angular/router';
import { CustomerApiServiceService } from '../../shared/CRUD/customer-api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor (private router: Router){}

  userLogged = false

  logout(){
    sessionStorage.clear()
    localStorage.clear()
    this.checkLogged()
    this.router.navigate(['/']);
  }

  ngOnInit(){
    this.checkLogged()
  }

  checkLogged(){
    if(localStorage.getItem("username") != null || sessionStorage.getItem("username") != null){
      this.userLogged = true
    }
    else{
      this.userLogged = false
    }
  }

  redirect( searchParam : string){
    this.router.navigateByUrl(`/products?searchParam=${searchParam}`)
  }


}