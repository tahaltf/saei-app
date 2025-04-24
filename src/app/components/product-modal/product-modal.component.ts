import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { IProduct } from '../../interfaces';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [DialogModule, FormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css'
})
export class ProductModalComponent implements OnInit {
  isShowDetailModal: boolean = false;
  saveProductModel: IProduct = { id: 0, price: 0, title: '' }
  constructor(private messageService: MessageService, private shopService: ShopService) { }
  ngOnInit() {
    this.shopService.$editModal.subscribe((data: any) => {
      this.showDetailModal();
      this.saveProductModel = data
    })
  }
  showDetailModal() {
    this.isShowDetailModal = true;
  };
  saveProduct() {
    if (!this.saveProductModel.title || !this.saveProductModel.price) {
      this.messageService.add({ severity: 'error', summary: 'خطا در ذخیره اطلاعات', detail: 'اطلاعات را به درستی وارد کنید !' });
      return
    }
    try {
      if (this.saveProductModel.id == 0) {
        const ID: any = this.shopService.generateId();
        this.saveProductModel.id = ID
      }
      this.shopService.saveProduct(this.saveProductModel);
      this.messageService.add({ severity: 'success', summary: 'موفق', detail: 'ذخیره با موفقیت انجام شد' });
      this.shopService.productChanges();
      this.saveProductModel = { id: 0, price: 0, title: '' }
      this.isShowDetailModal = false
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'خطا در ذخیره اطلاعات', detail: 'اطلاعات را به درستی وارد کنید !' });

    }
  }
}
