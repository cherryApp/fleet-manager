import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  cols = {
    drivers: [
      { key: 'id', text: '#', type: "plain"},
      { key: 'name', text: 'Drivers Name', type: "text"},
      { key: 'email', text: 'Email', type: "email"},
      { key: 'phone', text: 'Phone', type: "number"},
      { key: 'city', text: 'City', type: "text"},
      { key: 'address', text: 'Street address', type: "text" }
    ],
    vehicles: [
      { key: "id", text: "#", type: "plain"},
      { key: "lp", text: "LP.", type: "text"},
      { key: "year", text: "Year", type: "number"},
      { key: "manufacturer", text: "Man.", type: "text"},
      { key: "consumption", text: "Cons.", type: "text"},
      { key: "engine", text: "Eng.", type: "text" }
    ],
    fuelings: [
      { key: "id", text: "#", type: "plain"},
      { key: "vehicleId", text: "Vehicle", type: "text"},
      { key: "driverId", text: "Driver", type: "text"},
      { key: "amount", text: "Amount", type: "text"},
      { key: "date", text: "Date", type: "date" }
    ]
  };

  constructor() { }
}
