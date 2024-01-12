import { Component, Renderer2 } from '@angular/core';
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

	userLogged = false
	managementFade = false
	userAdmin = false
	
	constructor(private router: Router, private renderer: Renderer2) { }

	ngOnInit() {
		this.checkLogged()
	}

	checkAdmin() {
		this.userAdmin = false;
		if(localStorage.getItem("authorization") == btoa('Admin') || sessionStorage.getItem("authorization") == btoa('Admin')){
			this.userAdmin = true
			console.log("qui")
		}
		else{
			this.userAdmin = false
		}
	}

	logout() {
		sessionStorage.clear()
		localStorage.clear()
		this.checkLogged()
		this.router.navigate(['/']);
	}

	checkLogged() {
		if (localStorage.getItem("username") != null || sessionStorage.getItem("username") != null) {
			this.userLogged = true
			this.checkAdmin()
		}
		else {
			this.userLogged = false
		}
	}

	redirect(searchParam: string) {
		this.router.navigateByUrl(`/search/${searchParam}`)
	}

	toggleFade(b1: HTMLDivElement,b2: HTMLDivElement,b3: HTMLDivElement,b4: HTMLDivElement,b5: HTMLDivElement) {
		this.managementFade = !this.managementFade
		setTimeout(() => {
			if(!this.managementFade){
				b4.classList.add('d-none')
				b5.classList.add('d-none')
				b1.classList.remove('d-none')
				b2.classList.remove('d-none')
				b3.classList.remove('d-none')
			}else{
				b1.classList.add('d-none')
				b2.classList.add('d-none')
				b3.classList.add('d-none')
				b4.classList.remove('d-none')
				b5.classList.remove('d-none')
			}
		}, 500)
	}
}