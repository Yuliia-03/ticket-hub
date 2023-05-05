import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms'

import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
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
  })

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    // console.log("search", search);
  }

  search(): void {
    console.log("HI");
    let search = this.searchService.search(
                  {
                  "departure": "Krakow (Cracow) - John Paul II International Airport",
            "arrival": "Leon",
            "date": "2023-07-02",
            "adults": 1,
            "students": 0,
            "youths12_17": 0,
            "children2_11": 0,
            "toddlers_on_lap": 0,
            "toddlers_in_own_seat": 0,
            "cabin_class": "economy"
                  }
    ).subscribe(
      (resp: any) => {
        console.log("resp", resp);
      }
    );
  }
}
