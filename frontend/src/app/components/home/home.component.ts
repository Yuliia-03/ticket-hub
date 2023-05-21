import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

import {
    SearchService,
} from 'src/app/services/search.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    searchForm = new FormGroup({
        departure: new FormControl(''),
        arrival: new FormControl(''),
        date: new FormControl(''),
        adults: new FormControl(''),
        students: new FormControl(''),
        youths12_17: new FormControl(''),
        children2_11: new FormControl(''),
        toddlers_on_lap: new FormControl(''),
        toddlers_in_own_seat: new FormControl(''),
        cabin_class: new FormControl(''),
    });


    searchResults: any = null;
    cities: any = null;
    departureCities: any = null;
    arrivalCities: any = null;

    dateToday() {
        const now = new Date();

        return [
            now.getFullYear(),
            (now.getMonth() + 1).toString().padStart(2, '0'),
            (now.getDate()).toString().padStart(2, '0'),
        ].join('-');
    };  
    
    count = 0
    increment() {
        this.count = this.count + 1
    }
    decrement() {
        if (this.count == 0) {
            this.count = 0
        } else {
            this.count = this.count - 1
        }
    }

    constructor(private searchService: SearchService) {}

    ngOnInit(): void {
        this.get_cities();        
    }

    search(): void {
        console.log('searchForm', this.searchForm.value);
        
        this.searchService.search(
          // {
          //       departure:
          //           'Krakow (Cracow) - John Paul II International Airport',
          //       arrival: 'Leon',
          //       date: '2023-07-02',
          //       adults: 1,
          //       students: 0,
          //       youths12_17: 0,
          //       children2_11: 0,
          //       toddlers_on_lap: 0,
          //       toddlers_in_own_seat: 0,
          //       cabin_class: 'economy',
          //   }
          {
                departure: this.searchForm.value.departure!,
                arrival: this.searchForm.value.arrival!,
                date: this.searchForm.value.date!,
                adults: parseFloat(this.searchForm.value.adults!),
                students: parseFloat(this.searchForm.value.students!),
                youths12_17: parseFloat(this.searchForm.value.youths12_17!),
                children2_11: parseFloat(this.searchForm.value.children2_11!),
                toddlers_on_lap: parseFloat(this.searchForm.value.toddlers_on_lap!),
                toddlers_in_own_seat: parseFloat(this.searchForm.value.toddlers_in_own_seat!),
                cabin_class: this.searchForm.value.cabin_class!,
            }
            ).subscribe((resp: any) => {
                console.log('resp', resp);
                this.searchResults = resp;
            });
    }

    departureChanged() {
        let departureAirport = this.searchForm.get('departure')?.value;
        this.departureCities = this.cities;
        this.arrivalCities = this.cities;
        this.arrivalCities = this.cities.filter((el: any) => el.city_airport !== departureAirport)
    }

    arrivalChanged() {
        let arrivalAirport = this.searchForm.get('arrival')?.value;
        this.departureCities = this.cities;
        this.arrivalCities = this.cities;
        this.departureCities = this.cities.filter((el: any) => el.city_airport !== arrivalAirport)
    }
    get_cities(): void {
        this.searchService.get_city().subscribe((resp: any) => {
            this.cities = resp;
            this.departureCities = this.cities;
            this.arrivalCities = this.cities;
        });
    }
}
