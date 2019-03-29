import { Component, OnInit } from '@angular/core';
import { Base } from '../base';
import { BaseService } from 'src/app/service/base.service';
import { ConfigService } from 'src/app/service/config.service';
import { zip, Subject } from 'rxjs';

@Component({
  selector: 'app-fueling',
  templateUrl: './fueling.component.html',
  styleUrls: ['./fueling.component.css']
})
export class FuelingComponent extends Base {

  constructor(
    baseService: BaseService,
    config: ConfigService
  ) {
    super(baseService, config, 'fuelings');
  }

  ngOnInit() {
    let driverObservable = this.baseService.getAll('drivers');
    let vehicleObservable = this.baseService.getAll('vehicles');
    zip(
      driverObservable,
      vehicleObservable
    ).subscribe( 
      valueList => {
        let driverOptions = this.processOptions(valueList[0], 'id', 'name');
        let vehicleOptions = this.processOptions(valueList[1], 'id', 'lp');
        let newCols = this.config.cols[this.dataType];

        for (let k in newCols) {
          if (newCols[k].key == 'vehicleId') {
            newCols[k].options = vehicleOptions;
            newCols[k].type = 'select';
          }
          if (newCols[k].key == 'driverId') {
            newCols[k].options = driverOptions;
            newCols[k].type = 'select';
          }
        }
        this.cols = newCols;
      }
    );


    // Get own data list.
    this.listSubscription = this.baseService.getAll(this.dataType)
    .subscribe(
      list => this.list = list,
      err => console.error(err)
    );
  }

  processOptions(list: any[], value: string, text: string): any[] {
    let listDone: any[] = [];
    for (let item of list) {
      let row: any = {};
      row.value = item[value];
      row.text = item[text];
      listDone.push(row);
    }
    return listDone;
  }

}
