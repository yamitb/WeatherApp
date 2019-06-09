import { Injectable } from '@angular/core';
import { Item } from '../models/Item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observer } from '../../../node_modules/rxjs';

const BACKEND_URL = "http://localhost:3000";

const htttpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  items: Item[] = [];
  itemsUpdated = new Subject<{ items: Item[] }>();
  cities = ["Tel Aviv", "Paris", "New York"];

  constructor(private http: HttpClient) { }

  getItems() {
    this.cities.forEach(city => {
      this.getItemHttp(city).subscribe(response => {
        if (response.result === 1) {
          this.items.push(response.item);
          this.itemsUpdated.next({ items: [...this.items] });
        }
      });
    });
  }
  getItemHttp(city) {
    let weather = {
      location: city
    }
    return this.http.post<{ result: number, item: Item }>(BACKEND_URL + "/item", weather);
  }

  getItemsListener() {
    return this.itemsUpdated.asObservable();
  }

  getItem(location: string) {
    let weather = {
      location: location
    }
    return this.http.post<{ result: number, item: Item }>(BACKEND_URL + "/item", weather);

  }
}
