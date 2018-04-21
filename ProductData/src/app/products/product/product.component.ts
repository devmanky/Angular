import { Component, OnInit, OnChanges } from '@angular/core';

import { NgForm } from '@angular/forms';
import {ProductService} from '../Shared/product.service'
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
sum :number=0;
handleChange(value: number){
  this.sum += value;
  
}

  constructor(private productService : ProductService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form? : NgForm){
    if(form != null)
    form.reset(); 
    this.productService.slectedProduct = {
      ProductID:null,
      Category : '',
      RangeBrand : '',
      Brand : '',
      TV : null,
      Print : null,
      Radio : null,
      Digital : null,
      OOH : null,
      BTL : null,
      Total:null,
   
    }
}


onSubmit(form : NgForm){
  if(form.value.ProductID == null){
    debugger
    form.value.Total=form.value.TV+form.value.Print+form.value.Radio+form.value.Digital+form.value.OOH+form.value.BTL;
  console.log(this.sum);
  this.productService.postProduct(form.value)
  .subscribe( data =>{
  this.resetForm(form);
  this.productService.getProductList();
})
 }
 else{
   form.value.Total=form.value.TV+form.value.Print+form.value.Radio+form.value.Digital+form.value.OOH+form.value.BTL;
   this.productService.putProduct(form.value.ProductID, form.value)
  .subscribe(data => {
    this.resetForm(form);
    this.productService.getProductList();
   
  });
}
}
}
