import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators'

import { environment } from "src/environment/environment";

@Injectable({
    providedIn: "root"
})
export class SearchService {
    constructor (private http: HttpClient) { }
    apiUrl = environment.apiUrl; 

    search(flightSearchForm: FlightSearchForm): Observable<any> {
        let flightSearchUrl = this.apiUrl + "flight/search";
        return this.http.post<any>(flightSearchUrl, 
            flightSearchForm
        //     {
        //     "departure": flightSearchForm.departure,
        //     "arrival": flightSearchForm.arrival,
        //     "date": flightSearchForm.date,
        //     "adults": flightSearchForm.adults,
        //     "students": flightSearchForm.students,
        //     "youths12_17": flightSearchForm.youths12_17,
        //     "children2_11": flightSearchForm.children2_11,
        //     "toddlers_on_lap": flightSearchForm.toddlers_on_lap,
        //     "toddlers_in_own_seat": flightSearchForm.toddlers_in_own_seat,
        //     "cabin_class": flightSearchForm.cabin_class
        //   }
          ).
            pipe(
                tap((resp: HttpResponse<any>) => {
                    return resp;
                }),
                catchError(this.errorHandler)
            )
    }
    
    get_city(): Observable<any> {
        let flightSearchUrl = this.apiUrl + "flight/search";
      return this.http.get<any>(flightSearchUrl).
            pipe(
                tap((resp: HttpResponse<any>) => {
                    return resp;
                }),
                catchError(this.errorHandler)
            )
    }

  
    private errorHandler(error: HttpErrorResponse) {
        console.log(error);
    
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            error,
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        if (error.status == 400) {
          return throwError(error.error.detail)
        }
        if (error.status == 401) {
          return throwError("Wrong credentials")
        }
        if (error.status == 422) {
          return throwError("Wrong data type")
        }
        return throwError(
          'Something bad happened; please try again later.');
      }
}

export interface FlightSearchForm {
    departure: string, 
    arrival: string,
    date: string,
    adults: number,
    students: number,
    youths12_17: number,
    children2_11: number,
    toddlers_on_lap: number,
    toddlers_in_own_seat: number,
    cabin_class: string
}
