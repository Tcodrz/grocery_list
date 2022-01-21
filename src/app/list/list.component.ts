import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Item } from 'src/app/core/models/item.interface';
import { List } from './../core/models/list.interface';
import { User } from './../core/models/user.interface';
import { AppCacheKeys, CacheService } from './../core/services/cache.service';
import { ModalGenericService } from './../shared/services/modal-generic.service';

@Component({
  selector: 'gl-lists',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {
  @Input() user: User;
  @Input() lists: List[];
  iCurrentIndex: number = 0;
  items: Item[];
  bIsLoading = true;
  selected: any;
  constructor(
    private modal: ModalGenericService,
    private cache: CacheService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.iCurrentIndex = this.cache.getItem(AppCacheKeys.iActiveList) || 0;
  }
  ngOnInit(): void {
    this.init();
    this.modal.closed().subscribe(() => {
      this.init();
    });
  }
  private init(): void {
    this.items = this.lists[this.iCurrentIndex].items;
    this.bIsLoading = this.lists.length <= 0;;
  }
  onChangeList(i: number) {
    this.iCurrentIndex = i;
    this.cache.cache(AppCacheKeys.iActiveList, this.iCurrentIndex);
  }
  onAddList(): void {
    this.modal.open({ sComponent: 'add-list', sTitle: 'הוספת רשימה' });
  }

}
