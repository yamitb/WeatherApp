import { Component, OnInit, ViewChild } from '@angular/core';
import { Item } from '../../models/Item';
import { DataService } from '../../services/data.service'
import { NgForm } from '@angular/forms';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.css']
})
export class WeatherFormComponent implements OnInit {
  item: Item;
  items: Item[];
  private ItemsListenerSub: Subscription;


  @ViewChild('weatherForm') form: any;
  isEmpty: boolean = true;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getItems();
    this.ItemsListenerSub = this.dataService.getItemsListener().subscribe((result: { items: Item[] }) => {
      this.items = result.items;
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      console.log("Form is invalid!");
      return;
    }

    this.dataService.getItem(form.value.location).subscribe((responseData) => {
      if (responseData.result === 1) {
        this.item = responseData.item;
        this.isEmpty = false;
      }
    });
    this.form.reset();
  }

}
