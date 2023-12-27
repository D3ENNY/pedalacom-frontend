import { Routes } from '@angular/router';
// NAVBAR ROUTES
import { HomeComponent } from './features/home/home.component';
import { ProductsComponent } from './features/products/products.component';
import { CartComponent } from './features/cart/cart.component';
import { ContactsComponent } from './features/contacts/contacts.component';
// IN-PAGE ROUTES
import { BikepageComponent } from './features/bikePage/bikepage.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { AddProductsComponent } from './features/admin/add-products/add-products.component';

export const routes: Routes = [
    // NAVBAR ROUTES
    {path: '', component: HomeComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'cart', component: CartComponent},
    {path: 'contacts', component: ContactsComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'addProduct', component: AddProductsComponent},
    // IN-PAGE ROUTES
    {path: 'products/bike', component: BikepageComponent},
    // QUERY PARAM
    {path: 'products/:searchParam', component: ProductsComponent},
    // DEFAULT REDIRECT E 404 PAGE
    {path: '**', component: NotFoundComponent },
    {path:'', redirectTo: 'home', pathMatch: 'full'}
];
