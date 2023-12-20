import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  userLogged = false

  checkLogged(){
    if(localStorage.getItem("username") != null || sessionStorage.getItem("username") != null){
      this.userLogged = true
    }
    else{
      this.userLogged = false
    }
  }

  ngOnInit(): void {
    this.checkLogged();
  }
}
