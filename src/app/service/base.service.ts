import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  serverUrl: string = "http://localhost:3000/";
  observables: any = {};

  constructor(
    private http: HttpClient
  ) { }

  query(dataType: string, params: string): Promise<any> {
    let url = `${this.serverUrl}${dataType}?${params}`;
    return this.http.get(url).toPromise();
  }

  getAll(dataType: string): Observable<any> {
    let url = `${this.serverUrl}${dataType}`;

    if (!this.observables[dataType]) {
      this.observables[dataType] = new Subject();
    }

    this.http.get(url).forEach( 
      data => this.observables[dataType].next(data)
    );

    return this.observables[dataType];
  }

  create(dataType: string, row: any): void {
    let url = `${this.serverUrl}${dataType}`;
    this.http.post(url, row)
      .forEach( response => this.getAll(dataType) );
  }
  
  update(dataType: string, row: any): void {
    let url = `${this.serverUrl}${dataType}/${row.id}`;
    this.http.put(url, row)
      .forEach( response => this.getAll(dataType) );
  }
  
  delete(dataType: string, row: any): void {
    let url = `${this.serverUrl}${dataType}/${row.id}`;
    this.http.delete(url)
      .forEach( response => this.getAll(dataType) );
  }
}
