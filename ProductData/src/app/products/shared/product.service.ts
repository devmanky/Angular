import { Injectable } from '@angular/core';
import{Http,Response,Headers,RequestOptions,RequestMethod} from '@angular/http';
import{Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Product} from './product.model'
@Injectable()
export class ProductService {

  slectedProduct : Product; 
  productList : Product[];
  constructor(private http : Http) { }
  
  postProduct(pro : Product){
  var body = JSON.stringify(pro);
  var headerOption = new Headers({'Content-Type':'application/json'});
  var requestOption = new RequestOptions({method : RequestMethod.Post,headers :headerOption})
  return this.http.post('http://localhost:61543//api//Products',body,requestOption).map (x => x.json());
}

putProduct(id, pro) {
  var body = JSON.stringify(pro);
  var headerOptions = new Headers({ 'Content-Type': 'application/json' });
  var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
  return this.http.put('http://localhost:61543//api//Products/' + id,
    body,
    requestOptions).map(res => res.json());
}
getProductList(){
  this.http.get('http://localhost:61543//api//Products')
  .map((data : Response) => {
    return data.json() as Product[];
  }).toPromise().then(x => {
    this.productList = x;
  })
  
}
deleteProduct(id: number) {
  return this.http.delete('http://localhost:61543/api/Products/' + id).map(res => res.json());

}
}
