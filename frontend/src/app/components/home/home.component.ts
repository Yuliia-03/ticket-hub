import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

import { SearchService } from 'src/app/services/search.service';

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
    filteredResults: any = this.searchResults;
    cities: any = null;
    departureCities: any = null;
  arrivalCities: any = null;
  
  directions = new Set<string>();

    filterIsEmpty: boolean = true;
    filterState: any = {
      stops:{
        title: "Stops",
        values: [
        {
          key: 0,
          value: 0,
          title: 'Direct flight',
          selected: true
        },{
          key: 1,
          value: 1,
          title: '1 stop',
          selected: true
        } ,{
          key: 2,
          value: 2,
          title: '2+ stops',
          selected: true
        } 
        ]
      },
      airports: {
        title: "Airports",
        values: []
      }
      
  };
  
    dateToday() {
        const now = new Date();

        return [
            now.getFullYear(),
            (now.getMonth() + 1).toString().padStart(2, '0'),
            now.getDate().toString().padStart(2, '0'),
        ].join('-');
    }

    constructor(private searchService: SearchService) {}

    ngOnInit(): void {
        this.get_cities();
      //   this.searchResults = [
      //     {
      //         "date_time_from": "2023-07-01T14:55:00",
      //         "date_time_in": "2023-07-02T22:10:00",
      //         "total_price": "£922",
      //         "price_for_person": "",
      //         "airport_departure_IATA": "AUS",
      //         "airport_departure_name": "Austin Bergstrom",
      //         "airport_arrival_IATA": "LHR",
      //         "airport_arrival_name": "Heathrow",
      //         "route": {
      //             "stops": "1 stop",
      //             "transfers": [
      //                 {
      //                     "airport_IATA": "ORD",
      //                     "airport_name": "Chicago O'Hare Intl",
      //                     "waiting_time": "14h 34m "
      //                 }
      //             ]
      //         },
      //         "duration": "25h 15m",
      //         "cabin_class": "Economy Classic",
      //         "company": "Finnair",
      //         "url": "https://www.kayak.co.uk/book/flight?code=RcHiPb-tDR.kUvKXh-Ch4QCTw-9KaXjEA.113727.42bc284d817c47d96f4be3ceeab42cfa&h=a6c490a709a3&_kw_pbranded=true&sub=E-113c2190e6e&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M1"
      //     },
      //     {
      //         "date_time_from": "2023-07-01T16:42:00",
      //         "date_time_in": "2023-07-03T17:00:00",
      //         "total_price": "£1,019",
      //         "price_for_person": "",
      //         "airport_departure_IATA": "AUS",
      //         "airport_departure_name": "Austin Bergstrom",
      //         "airport_arrival_IATA": "LHR",
      //         "airport_arrival_name": "Heathrow",
      //         "route": {
      //             "stops": "2 stops",
      //             "transfers": [
      //                 {
      //                     "airport_IATA": "EWR,",
      //                     "airport_name": "Newark",
      //                     "waiting_time": "19h 45m "
      //                 },
      //                 {
      //                     "airport_IATA": "ARN",
      //                     "airport_name": "Stockholm Arlanda",
      //                     "waiting_time": "8h 10m "
      //                 }
      //             ]
      //         },
      //         "duration": "42h 18m",
      //         "cabin_class": "Economy Classic",
      //         "company": "Scandinavian Airlines",
      //         "url": "https://www.kayak.co.uk/book/flight?code=RcHiPb-tDR.kUvKXh-Ch4QCTw-9KaXjEA.125702.8aaf64e41533309a7a0f53404462c680&h=66f60d85224c&_kw_pbranded=true&sub=E-1f9370f7100&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M2"
      //     },
      //     {
      //         "date_time_from": "2023-07-01T17:49:00",
      //         "date_time_in": "2023-07-02T20:35:00",
      //         "total_price": "£1,082",
      //         "price_for_person": "",
      //         "airport_departure_IATA": "AUS",
      //         "airport_departure_name": "Austin Bergstrom",
      //         "airport_arrival_IATA": "LHR",
      //         "airport_arrival_name": "Heathrow",
      //         "route": {
      //             "stops": "2 stops",
      //             "transfers": [
      //                 {
      //                     "airport_IATA": "IAH,",
      //                     "airport_name": "Houston George Bush Intcntl",
      //                     "waiting_time": "2h 04m "
      //                 },
      //                 {
      //                     "airport_IATA": "IST",
      //                     "airport_name": "Istanbul",
      //                     "waiting_time": "1h 40m "
      //                 }
      //             ]
      //         },
      //         "duration": "20h 46m",
      //         "cabin_class": "Economy Classic",
      //         "company": "Turkish Airlines",
      //         "url": "https://www.kayak.co.uk/book/flight?code=RcHiPb-tDR.kUvKXh-Ch4QCTw-9KaXjEA.133431.addae9b682466afb50cd22bbb8b9320f&h=9aa0858d9769&_kw_pbranded=true&sub=E-1e1136fcfe3&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M4"
      //     },
      //     {
      //         "date_time_from": "2023-07-01T17:49:00",
      //         "date_time_in": "2023-07-02T22:25:00",
      //         "total_price": "£1,082",
      //         "price_for_person": "",
      //         "airport_departure_IATA": "AUS",
      //         "airport_departure_name": "Austin Bergstrom",
      //         "airport_arrival_IATA": "LHR",
      //         "airport_arrival_name": "Heathrow",
      //         "route": {
      //             "stops": "2 stops",
      //             "transfers": [
      //                 {
      //                     "airport_IATA": "IAH,",
      //                     "airport_name": "Houston George Bush Intcntl",
      //                     "waiting_time": "2h 04m "
      //                 },
      //                 {
      //                     "airport_IATA": "IST",
      //                     "airport_name": "Istanbul",
      //                     "waiting_time": "3h 30m "
      //                 }
      //             ]
      //         },
      //         "duration": "22h 36m",
      //         "cabin_class": "Economy Classic",
      //         "company": "Turkish Airlines",
      //         "url": "https://www.kayak.co.uk/book/flight?code=RcHiPb-tDR.kUvKXh-Ch4QCTw-9KaXjEA.133431.6707c23fda9ac0dd79f1a95f99b00a3d&h=0b95166139dc&_kw_pbranded=true&sub=E-1e1136fcfe3&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M5"
      //     },
      //     {
      //         "date_time_from": "2023-07-01T17:49:00",
      //         "date_time_in": "2023-07-03T09:50:00",
      //         "total_price": "£1,082",
      //         "price_for_person": "",
      //         "airport_departure_IATA": "AUS",
      //         "airport_departure_name": "Austin Bergstrom",
      //         "airport_arrival_IATA": "LHR",
      //         "airport_arrival_name": "Heathrow",
      //         "route": {
      //             "stops": "2 stops",
      //             "transfers": [
      //                 {
      //                     "airport_IATA": "IAH,",
      //                     "airport_name": "Houston George Bush Intcntl",
      //                     "waiting_time": "2h 04m "
      //                 },
      //                 {
      //                     "airport_IATA": "IST",
      //                     "airport_name": "Istanbul",
      //                     "waiting_time": "15h 00m "
      //                 }
      //             ]
      //         },
      //         "duration": "34h 01m",
      //         "cabin_class": "Economy Classic",
      //         "company": "Turkish Airlines",
      //         "url": "https://www.kayak.co.uk/book/flight?code=RcHiPb-tDR.kUvKXh-Ch4QCTw-9KaXjEA.133431.3818ce556292ed91f4d45a54e6746c4c&h=83b1b1acc7b9&_kw_pbranded=true&sub=E-1e1136fcfe3&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M7"
      //     },
      //     {
      //         "date_time_from": "2023-07-01T17:49:00",
      //         "date_time_in": "2023-07-03T12:30:00",
      //         "total_price": "£1,082",
      //         "price_for_person": "",
      //         "airport_departure_IATA": "AUS",
      //         "airport_departure_name": "Austin Bergstrom",
      //         "airport_arrival_IATA": "LHR",
      //         "airport_arrival_name": "Heathrow",
      //         "route": {
      //             "stops": "2 stops",
      //             "transfers": [
      //                 {
      //                     "airport_IATA": "IAH,",
      //                     "airport_name": "Houston George Bush Intcntl",
      //                     "waiting_time": "2h 04m "
      //                 },
      //                 {
      //                     "airport_IATA": "IST",
      //                     "airport_name": "Istanbul",
      //                     "waiting_time": "17h 35m "
      //                 }
      //             ]
      //         },
      //         "duration": "36h 41m",
      //         "cabin_class": "Economy Classic",
      //         "company": "Turkish Airlines",
      //         "url": "https://www.kayak.co.uk/book/flight?code=RcHiPb-tDR.kUvKXh-Ch4QCTw-9KaXjEA.133431.d18de5b84eed047dfe4c670f71459486&h=c7713355db9f&_kw_pbranded=true&sub=E-1e1136fcfe3&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M8"
      //     },
      //     {
      //         "date_time_from": "2023-07-01T17:49:00",
      //         "date_time_in": "2023-07-03T15:05:00",
      //         "total_price": "£1,082",
      //         "price_for_person": "",
      //         "airport_departure_IATA": "AUS",
      //         "airport_departure_name": "Austin Bergstrom",
      //         "airport_arrival_IATA": "LHR",
      //         "airport_arrival_name": "Heathrow",
      //         "route": {
      //             "stops": "2 stops",
      //             "transfers": [
      //                 {
      //                     "airport_IATA": "IAH,",
      //                     "airport_name": "Houston George Bush Intcntl",
      //                     "waiting_time": "2h 04m "
      //                 },
      //                 {
      //                     "airport_IATA": "IST",
      //                     "airport_name": "Istanbul",
      //                     "waiting_time": "20h 20m "
      //                 }
      //             ]
      //         },
      //         "duration": "39h 16m",
      //         "cabin_class": "Economy Classic",
      //         "company": "Turkish Airlines",
      //         "url": "https://www.kayak.co.uk/book/flight?code=RcHiPb-tDR.kUvKXh-Ch4QCTw-9KaXjEA.133431.7d42681986047aba7e3ff63e42af07dc&h=2e1f98296669&_kw_pbranded=true&sub=E-1e1136fcfe3&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M9"
      //     },
      //     {
      //         "date_time_from": "2023-07-01T17:49:00",
      //         "date_time_in": "2023-07-03T16:45:00",
      //         "total_price": "£1,082",
      //         "price_for_person": "",
      //         "airport_departure_IATA": "AUS",
      //         "airport_departure_name": "Austin Bergstrom",
      //         "airport_arrival_IATA": "LHR",
      //         "airport_arrival_name": "Heathrow",
      //         "route": {
      //             "stops": "2 stops",
      //             "transfers": [
      //                 {
      //                     "airport_IATA": "IAH,",
      //                     "airport_name": "Houston George Bush Intcntl",
      //                     "waiting_time": "2h 04m "
      //                 },
      //                 {
      //                     "airport_IATA": "IST",
      //                     "airport_name": "Istanbul",
      //                     "waiting_time": "22h 00m "
      //                 }
      //             ]
      //         },
      //         "duration": "40h 56m",
      //         "cabin_class": "Economy Classic",
      //         "company": "Turkish Airlines",
      //         "url": "https://www.kayak.co.uk/book/flight?code=RcHiPb-tDR.kUvKXh-Ch4QCTw-9KaXjEA.133431.f8316586c4e581555071777494d6c896&h=06b4e5181ae0&_kw_pbranded=true&sub=E-1e1136fcfe3&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M10"
      //     },
      //     {
      //         "date_time_from": "2023-07-01T12:00:00",
      //         "date_time_in": "2023-07-02T20:55:00",
      //         "total_price": "£1,137",
      //         "price_for_person": "",
      //         "airport_departure_IATA": "AUS",
      //         "airport_departure_name": "Austin Bergstrom",
      //         "airport_arrival_IATA": "LHR",
      //         "airport_arrival_name": "Heathrow",
      //         "route": {
      //             "stops": "1 stop",
      //             "transfers": [
      //                 {
      //                     "airport_IATA": "IAD",
      //                     "airport_name": "Washington, D.C. Dulles Intl",
      //                     "waiting_time": "16h 10m "
      //                 }
      //             ]
      //         },
      //         "duration": "26h 55m",
      //         "cabin_class": "Economy Classic",
      //         "company": "Lufthansa",
      //         "url": "https://www.kayak.co.uk/book/flight?code=RcHiPb-tDR.3OUpS3kmFJuhkszVg4LUcQ.140310.021f22a8e5652ff23b32d81cf6cd03aa&h=337f2ba30d52&_kw_pbranded=true&sub=E-198e0bba03c&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M12"
      //     },
      //     {
      //         "date_time_from": "2023-07-01T07:15:00",
      //         "date_time_in": "2023-07-02T20:55:00",
      //         "total_price": "£1,137",
      //         "price_for_person": "",
      //         "airport_departure_IATA": "AUS",
      //         "airport_departure_name": "Austin Bergstrom",
      //         "airport_arrival_IATA": "LHR",
      //         "airport_arrival_name": "Heathrow",
      //         "route": {
      //             "stops": "1 stop",
      //             "transfers": [
      //                 {
      //                     "airport_IATA": "IAD",
      //                     "airport_name": "Washington, D.C. Dulles Intl",
      //                     "waiting_time": "20h 55m "
      //                 }
      //             ]
      //         },
      //         "duration": "31h 40m",
      //         "cabin_class": "Economy Classic",
      //         "company": "Lufthansa",
      //         "url": "https://www.kayak.co.uk/book/flight?code=RcHiPb-tDR.3OUpS3kmFJuhkszVg4LUcQ.140310.14e85f6f2fcf460bfdef9f92107bdf91&h=93fcab032077&_kw_pbranded=true&sub=E-198e0bba03c&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M13"
      //     },
      //     {
      //         "date_time_from": "2023-07-01T14:34:00",
      //         "date_time_in": "2023-07-03T09:00:00",
      //         "total_price": "£1,138",
      //         "price_for_person": "",
      //         "airport_departure_IATA": "AUS",
      //         "airport_departure_name": "Austin Bergstrom",
      //         "airport_arrival_IATA": "LHR",
      //         "airport_arrival_name": "Heathrow",
      //         "route": {
      //             "stops": "2 stops",
      //             "transfers": [
      //                 {
      //                     "airport_IATA": "IAH,",
      //                     "airport_name": "Houston George Bush Intcntl",
      //                     "waiting_time": "20h 15m "
      //                 },
      //                 {
      //                     "airport_IATA": "ORD",
      //                     "airport_name": "Chicago O'Hare Intl",
      //                     "waiting_time": "4h 06m "
      //                 }
      //             ]
      //         },
      //         "duration": "36h 26m",
      //         "cabin_class": "Economy Classic",
      //         "company": "Lufthansa",
      //         "url": "https://www.kayak.co.uk/book/flight?code=RcHiPb-tDR.3OUpS3kmFJuhkszVg4LUcQ.140432.03e3f444a0b78185a5cd965bf1168a4a&h=7d17387f746d&_kw_pbranded=true&sub=E-11f0d597918&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M14"
      //     },
      //     {
      //         "date_time_from": "2023-07-01T14:34:00",
      //         "date_time_in": "2023-07-03T09:00:00",
      //         "total_price": "£1,138",
      //         "price_for_person": "",
      //         "airport_departure_IATA": "AUS",
      //         "airport_departure_name": "Austin Bergstrom",
      //         "airport_arrival_IATA": "LHR",
      //         "airport_arrival_name": "Heathrow",
      //         "route": {
      //             "stops": "2 stops",
      //             "transfers": [
      //                 {
      //                     "airport_IATA": "IAH,",
      //                     "airport_name": "Houston George Bush Intcntl",
      //                     "waiting_time": "0h 40m "
      //                 },
      //                 {
      //                     "airport_IATA": "ORD",
      //                     "airport_name": "Chicago O'Hare Intl",
      //                     "waiting_time": "23h 44m "
      //                 }
      //             ]
      //         },
      //         "duration": "36h 26m",
      //         "cabin_class": "Economy Classic",
      //         "company": "Lufthansa",
      //         "url": "https://www.kayak.co.uk/book/flight?code=RcHiPb-tDR.3OUpS3kmFJuhkszVg4LUcQ.140432.fbbc3890896c54e082d48dcb331c1759&h=219302c2c5dd&_kw_pbranded=true&sub=E-11f0d597918&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M15"
      //     },
      //     {
      //         "date_time_from": "2023-07-01T12:20:00",
      //         "date_time_in": "2023-07-03T09:00:00",
      //         "total_price": "£1,138",
      //         "price_for_person": "",
      //         "airport_departure_IATA": "AUS",
      //         "airport_departure_name": "Austin Bergstrom",
      //         "airport_arrival_IATA": "LHR",
      //         "airport_arrival_name": "Heathrow",
      //         "route": {
      //             "stops": "2 stops",
      //             "transfers": [
      //                 {
      //                     "airport_IATA": "IAH,",
      //                     "airport_name": "Houston George Bush Intcntl",
      //                     "waiting_time": "22h 34m "
      //                 },
      //                 {
      //                     "airport_IATA": "ORD",
      //                     "airport_name": "Chicago O'Hare Intl",
      //                     "waiting_time": "4h 06m "
      //                 }
      //             ]
      //         },
      //         "duration": "38h 40m",
      //         "cabin_class": "Economy Classic",
      //         "company": "Lufthansa",
      //         "url": "https://www.kayak.co.uk/book/flight?code=RcHiPb-tDR.3OUpS3kmFJuhkszVg4LUcQ.140432.1f7bff9ac85d8e147d174b5bffd7f8d7&h=19d2db262e02&_kw_pbranded=true&sub=E-11f0d597918&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M17"
      //     },
      //     {
      //         "date_time_from": "2023-07-01T12:20:00",
      //         "date_time_in": "2023-07-03T09:00:00",
      //         "total_price": "£1,138",
      //         "price_for_person": "",
      //         "airport_departure_IATA": "AUS",
      //         "airport_departure_name": "Austin Bergstrom",
      //         "airport_arrival_IATA": "LHR",
      //         "airport_arrival_name": "Heathrow",
      //         "route": {
      //             "stops": "2 stops",
      //             "transfers": [
      //                 {
      //                     "airport_IATA": "IAH,",
      //                     "airport_name": "Houston George Bush Intcntl",
      //                     "waiting_time": "2h 59m "
      //                 },
      //                 {
      //                     "airport_IATA": "ORD",
      //                     "airport_name": "Chicago O'Hare Intl",
      //                     "waiting_time": "23h 44m "
      //                 }
      //             ]
      //         },
      //         "duration": "38h 40m",
      //         "cabin_class": "Economy Classic",
      //         "company": "Lufthansa",
      //         "url": "https://www.kayak.co.uk/book/flight?code=RcHiPb-tDR.3OUpS3kmFJuhkszVg4LUcQ.140432.2ed3412ef299d27691d88d1404b5ffab&h=0323edc6715a&_kw_pbranded=true&sub=E-11f0d597918&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M18"
      //     },
      //     {
      //         "date_time_from": "2023-07-01T14:34:00",
      //         "date_time_in": "2023-07-03T11:25:00",
      //         "total_price": "£1,138",
      //         "price_for_person": "",
      //         "airport_departure_IATA": "AUS",
      //         "airport_departure_name": "Austin Bergstrom",
      //         "airport_arrival_IATA": "LHR",
      //         "airport_arrival_name": "Heathrow",
      //         "route": {
      //             "stops": "2 stops",
      //             "transfers": [
      //                 {
      //                     "airport_IATA": "IAH,",
      //                     "airport_name": "Houston George Bush Intcntl",
      //                     "waiting_time": "20h 15m "
      //                 },
      //                 {
      //                     "airport_IATA": "ORD",
      //                     "airport_name": "Chicago O'Hare Intl",
      //                     "waiting_time": "6h 36m "
      //                 }
      //             ]
      //         },
      //         "duration": "38h 51m",
      //         "cabin_class": "Economy Classic",
      //         "company": "Lufthansa",
      //         "url": "https://www.kayak.co.uk/book/flight?code=RcHiPb-tDR.3OUpS3kmFJuhkszVg4LUcQ.140432.ae8e7b15949c335e2111ef68c808fd21&h=fde496dc92de&_kw_pbranded=true&sub=E-11f0d597918&payment=0.00:GBP:MC_D:Mastercard%20Debit:true&pageOrigin=F..RP.FE.M19"
      //     }
      // ];
        this.filteredResults = this.searchResults;
    }

    search(): void {
        this.searchService
            .search(
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
                    children2_11: parseFloat(
                        this.searchForm.value.children2_11!
                    ),
                    toddlers_on_lap: parseFloat(
                        this.searchForm.value.toddlers_on_lap!
                    ),
                    toddlers_in_own_seat: parseFloat(
                        this.searchForm.value.toddlers_in_own_seat!
                    ),
                    cabin_class: this.searchForm.value.cabin_class!,
                }
            )
            .subscribe((resp: any) => {
                console.log('resp', resp);
                this.searchResults = resp;
              this.filteredResults = resp;
              for (let searchResult of this.searchResults) {
                this.getAllAirports(searchResult);
                console.log(this.filterState)
              }
                //this.filterList();
            });
    }

    filtersChange(event: any, filter: any, group: any) {
      this.filterIsEmpty = true;
      for (let filterGroup in this.filterState) {
        for (let filterValue of this.filterState[filterGroup].values) {
          if (filterGroup == group && filterValue.key == filter.key) {
            filterValue.selected = event.target.checked;
          }
          if (this.filterIsEmpty == true) {
            this.filterIsEmpty = filterValue.selected
          }
        }
      }
      if (this.filterIsEmpty == false) {
        this.filterList();
      } else {
        this.filteredResults = this.searchResults;
      }
    }

  filterList() {
    

      if (!this.filterIsEmpty) {
        this.filteredResults = this.searchResults;
        

        for (let searchResult of this.searchResults) {

          if (!this.checkIfItemSatisfiesAirportsFilter(searchResult)) {
            this.filteredResults = this.filteredResults.filter((element: any) => {
              return element !== searchResult;
            });;
          }
          if (!this.checkIfItemSatisfiesStopsFilter(searchResult)) {
            this.filteredResults = this.filteredResults.filter((element: any) => {
              return element !== searchResult;
            });;
          }
        }
      }
    }
    

    checkIfItemSatisfiesStopsFilter(item: any): boolean {
      if (item.route.transfers.length == 0) {
        for (let stop of this.filterState.stops.values) {
          if (stop.value == 0 && !stop.selected) {
            return false;
          }
        }
      }
      if (item.route.transfers.length == 1) {
        for (let stop of this.filterState.stops.values) {
          if (stop.value == 1 && !stop.selected) {
            return false;
          }
        }
      }
      if (item.route.transfers.length >= 2) {
        for (let stop of this.filterState.stops.values) {
          if (stop.value == 2 && !stop.selected) {
            return false;
          }
        }
      }
      return true
  }

  getAllAirports(item: any): void {
    if (!this.directions.has(item.airport_departure_name)) {
      this.directions.add(item.airport_departure_name)
      this.filterState.airports.values.push({
        key: this.directions.size,
        value: item.airport_departure_name,
        title: item.airport_departure_name,
        selected: true
        
      })
    }

  }

  checkIfItemSatisfiesAirportsFilter(item: any): boolean {

    for (let airport of this.filterState.airports.values) {
      if (item.airport_departure_name == airport.title && !airport.selected) {
        return false;
      }
    }
    return true
  }



    toggleSection(section: any) {
      section.classList.toggle('active-sub-section');
      
  }
  
    departureChanged() {
        let departureAirport = this.searchForm.get('departure')?.value;
        this.departureCities = this.cities;
        this.arrivalCities = this.cities;
        this.arrivalCities = this.cities.filter(
            (el: any) => el.city_airport !== departureAirport
        );
    }

    arrivalChanged() {
        let arrivalAirport = this.searchForm.get('arrival')?.value;
        this.departureCities = this.cities;
        this.arrivalCities = this.cities;
        this.departureCities = this.cities.filter(
            (el: any) => el.city_airport !== arrivalAirport
        );
    }
    get_cities(): void {
        this.searchService.get_city().subscribe((resp: any) => {
            this.cities = resp;
            this.departureCities = this.cities;
            this.arrivalCities = this.cities;
        });
    }
}
