import { Component } from '@angular/core';
import { Item } from 'src/core/models/item.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  bShowTrash: boolean;
  items: Partial<Item>[] = [
    { sID: '1', sName: "Milk", iAmount: 3 },
    { sID: "2", sName: "Eggs", iAmount: 12 },
    { sID: "2", sName: "Bread", iAmount: 1 },
  ];

  selectedItems: Partial<Item>[] = [];
  onSelect() {
    this.bShowTrash = this.selectedItems.length > 0;
  }
  removeItems() {
    this.items = this.items.filter(item => !this.selectedItems.includes(item));
    this.selectedItems = [];
    this.bShowTrash = false;
  }
}
