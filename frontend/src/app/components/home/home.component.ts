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


    constructor(private searchService: SearchService) {}

    ngOnInit(): void {
        this.get_cities();
        this.searchResults = [
  {
    "date_time_from": "2023-07-02T06:10:00",
    "date_time_in": "2023-07-04T05:03:00",
    "price": "£604",
    "airport_departure_IATA": "KRK",
    "airport_departure_name": "J. Paul II Balice",
    "airport_arrival_IATA": "BJX",
    "airport_arrival_name": "Del Bajio",
    "route": {
      "stops": 3,
      "transfers": [
        {
          "airport_IATA": "POZ,",
          "airport_name": "Poznan Lawica",
          "waiting_time": "15h 10m "
        },
        {
          "airport_IATA": "STN-LGW,",
          "airport_name": "Airport change STN-LGW",
          "waiting_time": "11h 10m "
        },
        {
          "airport_IATA": "...",
          "airport_name": "Los Angeles",
          "waiting_time": "10h 40m "
        }
      ]
    },
    "duration": "54h 53m",
    "cabin_class": "Standard",
    "company": "Multiple Airlines",
    "url": "https://www.kayak.co.uk/book/flight?code=QbGCGPm9KP.FTZUJ6SC9iEmFcdAejOqIg.75655.9cfaf7bb6208023fdf393ca64156c298&h=bf5586ac5570&_kw_pbranded=true&sub=E-16476addb3d&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M0"
  },
  {
    "date_time_from": "2023-07-02T21:40:00",
    "date_time_in": "2023-07-04T07:34:00",
    "price": "£761",
    "airport_departure_IATA": "KRK",
    "airport_departure_name": "J. Paul II Balice",
    "airport_arrival_IATA": "BJX",
    "airport_arrival_name": "Del Bajio",
    "route": {
      "stops": 3,
      "transfers": [
        {
          "airport_IATA": "ARN,",
          "airport_name": "Stockholm Arlanda",
          "waiting_time": "6h 30m "
        },
        {
          "airport_IATA": "CDG,",
          "airport_name": "Paris Charles de Gaulle",
          "waiting_time": "6h 15m "
        },
        {
          "airport_IATA": "...",
          "airport_name": "Mexico City Benito Juarez",
          "waiting_time": "11h 25m "
        }
      ]
    },
    "duration": "41h 54m",
    "cabin_class": "Standard",
    "company": "Norwegian, Aeromexico",
    "url": "https://www.kayak.co.uk/book/flight?code=QbGCGPm9KP.RX7w4XG0_ZINUvH8T-y68A.95207.14785db9682b68ef26db85b6e93d8d62&h=ca9e3fbb4494&sub=E-1f57fa752e4&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M1"
  },
  {
    "date_time_from": "2023-07-02T06:00:00",
    "date_time_in": "2023-07-02T22:26:00",
    "price": "£790",
    "airport_departure_IATA": "KRK",
    "airport_departure_name": "J. Paul II Balice",
    "airport_arrival_IATA": "BJX",
    "airport_arrival_name": "Del Bajio",
    "route": {
      "stops": 2,
      "transfers": [
        {
          "airport_IATA": "FRA,",
          "airport_name": "Frankfurt am Main",
          "waiting_time": "5h 55m "
        },
        {
          "airport_IATA": "MEX",
          "airport_name": "Mexico City Benito Juarez",
          "waiting_time": "3h 40m "
        }
      ]
    },
    "duration": "24h 26m",
    "cabin_class": "Standard",
    "company": "Lufthansa, Aeromexico",
    "url": "https://www.kayak.co.uk/book/flight?code=QbGCGPm9KP.hVPlmUai5GwDzQq2dWkU9A.98951.2a4797fd931b562bad4ca9c5cec35298&h=7107113f20a6&sub=E-15e9794d60c&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M2"
  },
  {
    "date_time_from": "2023-07-02T06:00:00",
    "date_time_in": "2023-07-03T07:34:00",
    "price": "£791",
    "airport_departure_IATA": "KRK",
    "airport_departure_name": "J. Paul II Balice",
    "airport_arrival_IATA": "BJX",
    "airport_arrival_name": "Del Bajio",
    "route": {
      "stops": 2,
      "transfers": [
        {
          "airport_IATA": "FRA,",
          "airport_name": "Frankfurt am Main",
          "waiting_time": "5h 55m "
        },
        {
          "airport_IATA": "MEX",
          "airport_name": "Mexico City Benito Juarez",
          "waiting_time": "12h 45m "
        }
      ]
    },
    "duration": "33h 34m",
    "cabin_class": "Standard",
    "company": "Lufthansa, Aeromexico",
    "url": "https://www.kayak.co.uk/book/flight?code=QbGCGPm9KP.hVPlmUai5GwDzQq2dWkU9A.99076.7c8c499fa08fe0e367d54b17ee05575f&h=7c28ca11ba10&sub=E-15e9794d60c&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M4"
  },
  {
    "date_time_from": "2023-07-02T06:00:00",
    "date_time_in": "2023-07-03T11:19:00",
    "price": "£791",
    "airport_departure_IATA": "KRK",
    "airport_departure_name": "J. Paul II Balice",
    "airport_arrival_IATA": "BJX",
    "airport_arrival_name": "Del Bajio",
    "route": {
      "stops": 2,
      "transfers": [
        {
          "airport_IATA": "FRA,",
          "airport_name": "Frankfurt am Main",
          "waiting_time": "5h 55m "
        },
        {
          "airport_IATA": "MEX",
          "airport_name": "Mexico City Benito Juarez",
          "waiting_time": "16h 35m "
        }
      ]
    },
    "duration": "37h 19m",
    "cabin_class": "Standard",
    "company": "Lufthansa, Aeromexico",
    "url": "https://www.kayak.co.uk/book/flight?code=QbGCGPm9KP.hVPlmUai5GwDzQq2dWkU9A.99076.08dc32bcf9a612825a3085f2aa7c8649&h=903f30a85f3e&sub=E-15e9794d60c&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M5"
  },
  {
    "date_time_from": "2023-07-02T06:00:00",
    "date_time_in": "2023-07-03T14:35:00",
    "price": "£791",
    "airport_departure_IATA": "KRK",
    "airport_departure_name": "J. Paul II Balice",
    "airport_arrival_IATA": "BJX",
    "airport_arrival_name": "Del Bajio",
    "route": {
      "stops": 2,
      "transfers": [
        {
          "airport_IATA": "FRA,",
          "airport_name": "Frankfurt am Main",
          "waiting_time": "5h 55m "
        },
        {
          "airport_IATA": "MEX",
          "airport_name": "Mexico City Benito Juarez",
          "waiting_time": "19h 55m "
        }
      ]
    },
    "duration": "40h 35m",
    "cabin_class": "Standard",
    "company": "Lufthansa, Aeromexico",
    "url": "https://www.kayak.co.uk/book/flight?code=QbGCGPm9KP.hVPlmUai5GwDzQq2dWkU9A.99076.85649a56fda8b33f81e2df5b6ddaaa43&h=5db169ceecce&sub=E-15e9794d60c&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M6"
  },
  {
    "date_time_from": "2023-07-02T06:00:00",
    "date_time_in": "2023-07-03T16:21:00",
    "price": "£791",
    "airport_departure_IATA": "KRK",
    "airport_departure_name": "J. Paul II Balice",
    "airport_arrival_IATA": "BJX",
    "airport_arrival_name": "Del Bajio",
    "route": {
      "stops": 2,
      "transfers": [
        {
          "airport_IATA": "FRA,",
          "airport_name": "Frankfurt am Main",
          "waiting_time": "5h 55m "
        },
        {
          "airport_IATA": "MEX",
          "airport_name": "Mexico City Benito Juarez",
          "waiting_time": "21h 35m "
        }
      ]
    },
    "duration": "42h 21m",
    "cabin_class": "Standard",
    "company": "Lufthansa, Aeromexico",
    "url": "https://www.kayak.co.uk/book/flight?code=QbGCGPm9KP.hVPlmUai5GwDzQq2dWkU9A.99076.681756d4b47cb21da7026d6ef5a8b697&h=319426c0e096&sub=E-15e9794d60c&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M7"
  },
  {
    "date_time_from": "2023-07-02T06:00:00",
    "date_time_in": "2023-07-03T18:21:00",
    "price": "£791",
    "airport_departure_IATA": "KRK",
    "airport_departure_name": "J. Paul II Balice",
    "airport_arrival_IATA": "BJX",
    "airport_arrival_name": "Del Bajio",
    "route": {
      "stops": 2,
      "transfers": [
        {
          "airport_IATA": "FRA,",
          "airport_name": "Frankfurt am Main",
          "waiting_time": "5h 55m "
        },
        {
          "airport_IATA": "MEX",
          "airport_name": "Mexico City Benito Juarez",
          "waiting_time": "23h 35m "
        }
      ]
    },
    "duration": "44h 21m",
    "cabin_class": "Standard",
    "company": "Lufthansa, Aeromexico",
    "url": "https://www.kayak.co.uk/book/flight?code=QbGCGPm9KP.hVPlmUai5GwDzQq2dWkU9A.99076.d0b61786ba4e50a97ab5dfcbbd9fd554&h=c53595aff5e0&sub=E-15e9794d60c&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M8"
  },
  {
    "date_time_from": "2023-07-02T19:15:00",
    "date_time_in": "2023-07-03T22:26:00",
    "price": "£803",
    "airport_departure_IATA": "KRK",
    "airport_departure_name": "J.Paul II Balice",
    "airport_arrival_IATA": "BJX",
    "airport_arrival_name": "Del Bajio",
    "route": {
      "stops": 2,
      "transfers": [
        {
          "airport_IATA": "FRA,",
          "airport_name": "Frankfurt am Main",
          "waiting_time": "16h 40m "
        },
        {
          "airport_IATA": "MEX",
          "airport_name": "Mexico City Benito Juarez",
          "waiting_time": "3h 40m "
        }
      ]
    },
    "duration": "35h 11m",
    "cabin_class": "Standard",
    "company": "Lufthansa, Aeromexico",
    "url": "https://www.kayak.co.uk/book/flight?code=QbGCGPm9KP.hVPlmUai5GwDzQq2dWkU9A.100579.c36660b6e2d79d8618c4dbe2394ad0bc&h=dfa0bf7069b6&sub=E-15e9794d60c&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M9"
  },
  {
    "date_time_from": "2023-07-02T14:15:00",
    "date_time_in": "2023-07-03T22:26:00",
    "price": "£803",
    "airport_departure_IATA": "KRK",
    "airport_departure_name": "J. Paul II Balice",
    "airport_arrival_IATA": "BJX",
    "airport_arrival_name": "Del Bajio",
    "route": {
      "stops": 2,
      "transfers": [
        {
          "airport_IATA": "FRA,",
          "airport_name": "Frankfurt am Main",
          "waiting_time": "21h 40m "
        },
        {
          "airport_IATA": "MEX",
          "airport_name": "Mexico City Benito Juarez",
          "waiting_time": "3h 40m "
        }
      ]
    },
    "duration": "40h 11m",
    "cabin_class": "Standard",
    "company": "Lufthansa, Aeromexico",
    "url": "https://www.kayak.co.uk/book/flight?code=QbGCGPm9KP.hVPlmUai5GwDzQq2dWkU9A.100579.8039610be5ff9db966122e19bafbf6bf&h=f35f97394329&sub=E-15e9794d60c&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M10"
  },
  {
    "date_time_from": "2023-07-02T12:45:00",
    "date_time_in": "2023-07-03T22:26:00",
    "price": "£803",
    "airport_departure_IATA": "KRK",
    "airport_departure_name": "J. Paul II Balice",
    "airport_arrival_IATA": "BJX",
    "airport_arrival_name": "Del Bajio",
    "route": {
      "stops": 2,
      "transfers": [
        {
          "airport_IATA": "FRA,",
          "airport_name": "Frankfurt am Main",
          "waiting_time": "23h 10m "
        },
        {
          "airport_IATA": "MEX",
          "airport_name": "Mexico City Benito Juarez",
          "waiting_time": "3h 40m "
        }
      ]
    },
    "duration": "41h 41m",
    "cabin_class": "Standard",
    "company": "Lufthansa, Aeromexico",
    "url": "https://www.kayak.co.uk/book/flight?code=QbGCGPm9KP.hVPlmUai5GwDzQq2dWkU9A.100579.7a7a664b9f114fc725ae78a3dc195559&h=0acaa4fb080d&sub=E-15e9794d60c&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M11"
  },
  {
    "date_time_from": "2023-07-02T19:15:00",
    "date_time_in": "2023-07-04T07:34:00",
    "price": "£803",
    "airport_departure_IATA": "KRK",
    "airport_departure_name": "J. Paul II Balice",
    "airport_arrival_IATA": "BJX",
    "airport_arrival_name": "Del Bajio",
    "route": {
      "stops": 2,
      "transfers": [
        {
          "airport_IATA": "FRA,",
          "airport_name": "Frankfurt am Main",
          "waiting_time": "16h 40m "
        },
        {
          "airport_IATA": "MEX",
          "airport_name": "Mexico City Benito Juarez",
          "waiting_time": "12h 45m "
        }
      ]
    },
    "duration": "44h 19m",
    "cabin_class": "Standard",
    "company": "Lufthansa, Aeromexico",
    "url": "https://www.kayak.co.uk/book/flight?code=QbGCGPm9KP.hVPlmUai5GwDzQq2dWkU9A.100579.cda00280fdedc21cb44fff164591d9ad&h=dafc1db6ba43&sub=E-15e9794d60c&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M12"
  },
  {
    "date_time_from": "2023-07-02T19:15:00",
    "date_time_in": "2023-07-04T11:19:00",
    "price": "£803",
    "airport_departure_IATA": "KRK",
    "airport_departure_name": "J. Paul II Balice",
    "airport_arrival_IATA": "BJX",
    "airport_arrival_name": "Del Bajio",
    "route": {
      "stops": 2,
      "transfers": [
        {
          "airport_IATA": "FRA,",
          "airport_name": "Frankfurt am Main",
          "waiting_time": "16h 40m "
        },
        {
          "airport_IATA": "MEX",
          "airport_name": "Mexico City Benito Juarez",
          "waiting_time": "16h 35m "
        }
      ]
    },
    "duration": "48h 04m",
    "cabin_class": "Standard",
    "company": "Lufthansa, Aeromexico",
    "url": "https://www.kayak.co.uk/book/flight?code=QbGCGPm9KP.hVPlmUai5GwDzQq2dWkU9A.100579.baea1f28e1f4f3a40c923422c66d761e&h=78aa50e3f03e&sub=E-15e9794d60c&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M13"
  },
  {
    "date_time_from": "2023-07-02T14:15:00",
    "date_time_in": "2023-07-04T07:34:00",
    "price": "£803",
    "airport_departure_IATA": "KRK",
    "airport_departure_name": "J. Paul II Balice",
    "airport_arrival_IATA": "BJX",
    "airport_arrival_name": "Del Bajio",
    "route": {
      "stops": 2,
      "transfers": [
        {
          "airport_IATA": "FRA,",
          "airport_name": "Frankfurt am Main",
          "waiting_time": "21h 40m "
        },
        {
          "airport_IATA": "MEX",
          "airport_name": "Mexico City Benito Juarez",
          "waiting_time": "12h 45m "
        }
      ]
    },
    "duration": "49h 19m",
    "cabin_class": "Standard",
    "company": "Lufthansa, Aeromexico",
    "url": "https://www.kayak.co.uk/book/flight?code=QbGCGPm9KP.hVPlmUai5GwDzQq2dWkU9A.100579.d760fd94ccbbc018cd129734598a096b&h=fe1f1104d027&sub=E-15e9794d60c&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M14"
  },
  {
    "date_time_from": "2023-07-02T12:45:00",
    "date_time_in": "2023-07-04T07:34:00",
    "price": "£803",
    "airport_departure_IATA": "KRK",
    "airport_departure_name": "J. Paul II Balice",
    "airport_arrival_IATA": "BJX",
    "airport_arrival_name": "Del Bajio",
    "route": {
      "stops": 2,
      "transfers": [
        {
          "airport_IATA": "FRA,",
          "airport_name": "Frankfurt am Main",
          "waiting_time": "23h 10m "
        },
        {
          "airport_IATA": "MEX",
          "airport_name": "Mexico City Benito Juarez",
          "waiting_time": "12h 45m "
        }
      ]
    },
    "duration": "50h 49m",
    "cabin_class": "Standard",
    "company": "Lufthansa, Aeromexico",
    "url": "https://www.kayak.co.uk/book/flight?code=QbGCGPm9KP.hVPlmUai5GwDzQq2dWkU9A.100579.a7abcfa7d1fd905c8ce4d06662e0d45f&h=fe2800800ee1&sub=E-15e9794d60c&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M15"
  }
]
    }

    search(): void {
        console.log('searchForm', this.searchForm.value);

        this.searchService.search(

            /* {
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
             }*/
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
