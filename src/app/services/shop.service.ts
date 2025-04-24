import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { IProduct } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private productCount = new BehaviorSubject<number>(0);
  private changeOnProducts = new Subject<void>();
  private changeEditModal = new Subject<IProduct>();
  $productCount = this.productCount.asObservable();
  $productChange = this.changeOnProducts.asObservable();
  $editModal = this.changeEditModal.asObservable();

  productChanges() {
    this.changeOnProducts.next();
  }
  editModal(data: IProduct) {
    this.changeEditModal.next(data);
  }
  products: IProduct[] = []
  changeCount(num: number) {
    this.productCount.next(num)
  }
  getProducts() {
    return of(this.products);
  }
  generateId() {
    let id = Math.floor(Math.random() * 10000);
    let idList = this.getProductIdList();
    if (idList.includes(id)) {
      return null;
    } else {
      return id
    }
  }
  getProductIdList() {
    let list: number[] = [];
    this.products.forEach(item => list.push(item.id));
    return list
  }
  saveProduct(data: IProduct) {
    let idList = this.getProductIdList();

    if (idList.includes(data.id)) {
      let index = this.products.findIndex(item => item.id == data.id);
      this.products[index] = data
    } else {
      this.products.push(data)
    }
  }
  removeItem(id: number) {
    this.products = this.products.filter(item => item.id != id);
    return of(this.products)
  }
}
