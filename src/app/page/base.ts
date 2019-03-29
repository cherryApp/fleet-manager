import { OnInit, OnDestroy } from '@angular/core';
import { BaseService } from 'src/app/service/base.service';
import { ConfigService } from 'src/app/service/config.service';
import { Subscription } from 'rxjs';

export class Base implements OnInit, OnDestroy {
    list: any = [];
    cols: any[] = [];
    listSubscription: Subscription;
  
    constructor(
      protected baseService: BaseService,
      protected config: ConfigService,
      public dataType: string
    ) {
  
    }
  
    ngOnInit() {
      this.cols = this.config.cols[this.dataType];
      this.listSubscription = 
      this.baseService.getAll(this.dataType)
      .subscribe(
        list => {
            console.log(list);
          this.list = list;
        },
        err => console.error(err),
        () => console.log('unsubscribed')
          );
    }
  
    ngOnDestroy() {
      this.listSubscription.unsubscribe();
    }
  
    onCreate(row: any): void {
      this.baseService.create(this.dataType, row);
    }
    
    onUpdate(row: any): void {
      this.baseService.update(this.dataType, row);
    }
    
    onDelete(row: any): void {
      this.baseService.delete(this.dataType, row);
    }
  }
