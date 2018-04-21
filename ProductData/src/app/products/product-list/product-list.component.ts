import { Component, OnInit } from '@angular/core';

import {ProductService} from '../Shared/product.service'
import {Product} from '../Shared/product.model'
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  constructor(private productService : ProductService) { }

  ngOnInit() {
    this.productService.getProductList();
  }
  showForEdit(pro : Product)
  {
    this.productService.slectedProduct = Object.assign({},pro);
  }
  onDelete(id: number) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.productService.deleteProduct(id)
      .subscribe(x => {
        this.productService.getProductList();
      })
    }
  }
}
  