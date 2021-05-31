import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { Store } from '@ngrx/store';
import {
  getCurrentProduct,
  getError,
  getProducts,
  getShowProductCode,
  State,
} from '../state';
import { ProductPageActions } from '../state/actions';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './product-shell.component.html',
})
export class ProductShellComponent implements OnInit {
  displayCode$: Observable<boolean>;
  selectedProduct$: Observable<Product>;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(ProductPageActions.loadProducts());
    this.products$ = this.store.select(getProducts);
    this.errorMessage$ = this.store.select(getError);
    this.selectedProduct$ = this.store.select(getCurrentProduct);
    this.displayCode$ = this.store.select(getShowProductCode);
  }

  checkChanged(): void {
    this.store.dispatch(ProductPageActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductPageActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(
      ProductPageActions.setCurrentProduct({ currentProductId: product.id })
    );
  }

  deleteProduct(product: Product): void {
    this.store.dispatch(
      ProductPageActions.deleteProduct({ productId: product.id })
    );
  }

  clearProduct(): void {
    this.store.dispatch(ProductPageActions.clearCurrentProduct());
  }
  saveProduct(product: Product): void {
    this.store.dispatch(ProductPageActions.createProduct({ product }));
  }

  updateProduct(product: Product): void {
    this.store.dispatch(ProductPageActions.updateProduct({ product }));
  }
}
