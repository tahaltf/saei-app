import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { TableModule } from 'primeng/table';
import { IProduct } from '../../interfaces';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup'
@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [TableModule, ConfirmPopupModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent implements OnInit {
  products: IProduct[] = [];
  constructor(private shopService: ShopService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {

  }
  ngOnInit(): void {
    this.shopService.$productChange.subscribe(() => {
      this.getProducts();
    })
  }
  getProducts() {
    try {
      this.shopService.getProducts().subscribe(data => {
        this.products = data
      })
      this.shopService.changeCount(this.products.length);

    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'خطا ', detail: 'خطا در ذخیره اطلاعات !' });
    }
  }

  removeItem(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'آیا از حذف اطمینان دارید؟',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        try {
          this.shopService.removeItem(id).subscribe(() => {
            this.messageService.add({ severity: 'success', summary: 'موفق ', detail: 'با موفقیت حذف شد !' });
            this.getProducts();
          })
        } catch (error) {
          this.messageService.add({ severity: 'error', summary: 'خطا ', detail: 'خطا در ذخیره اطلاعات !' });

        }
      },
    });
  }
  editItem(item: IProduct) {
    this.shopService.editModal(item);
  }
}
