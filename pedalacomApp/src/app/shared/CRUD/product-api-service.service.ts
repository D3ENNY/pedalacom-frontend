import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductApiServiceService {

  constructor(private http: HttpClient) { }

  headerOptions = new HttpHeaders({
    contentType: 'application/json',
    responseType: 'text'
  })

  // string initialization 
  product: string = "";

  // Get all products
  getProducts(): Observable<any> {
    return this.http.get('https://localhost:7150/api/Products');
  }

  // Get a product by ID
  getProductsbyId(): Observable<any> {
    return this.http.get(`https://localhost:7150/api/Products/${this.product}`);
  }

  getProductFiltered(searchData: string | null, bodyReq: any): Observable<any> {
    return this.http.post(`https://localhost:7150/api/Products/info?searchData=${searchData}`, bodyReq, {headers : new HttpHeaders({ contantType: 'application/json' })})
  }

  // Add a new product w OBJECT Injection
  postProducts(obj: Object): Observable<any> {
    return this.http.post('https://localhost:7150/api/Products', obj, { headers : new HttpHeaders({ contantType: 'application/json' }), observe: 'response' });
  }

  // Update a product w string Injection & OBJECT Injection
  putProducts(productId: string, obj: Object): Observable<any> {
    return this.http.put(`https://localhost:7150/api/Products/${productId}`, obj);
  }

  // Delete a product  w string Injection
  deleteProducts(productId: string): Observable<any> {
    return this.http.delete(`https://localhost:7150/api/Products/${productId}`);
  }
}

