import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FilterItem} from './filter-item';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  activeFilter: number = 0;

  @Input() filters: FilterItem<any>[];
  @Output() filterChangeEvent = new EventEmitter<FilterItem<any>>();

  constructor() {}

  /**
   * Selects filter
   *
   * @param filter Filter item
   * @param index Index number by order
   */
  selectItem(filter: FilterItem<any>, index: number) {
    if (this.activeFilter == index)
      return;

    this.activeFilter = index;
    this.filterChangeEvent.emit(filter);
  }
}
