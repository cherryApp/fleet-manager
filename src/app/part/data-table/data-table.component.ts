import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseService } from 'src/app/service/base.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @Input() list: any[];
  @Input() cols: any[];

  @Output() create: EventEmitter<any> = new EventEmitter();
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  phraseKey: string = 'notset';
  deleteIconClass: string = 'fa fa-trash-o';
  newRow: any = {};
  columns: any[];

  constructor(
    private baseService: BaseService
  ) {

  }

  ngOnInit() {

  }

  onCreate(row): void {
    this.create.emit(row);
  }
  
  onUpdate(row): void {
    this.update.emit(row);
  }
  
  onDelete(row): void {
    if (confirm("Are yue sure?")) {
      this.delete.emit(row);
    }
  }

}
