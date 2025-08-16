import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StarwarsService {

  constructor(private http: HttpClient) { }


  getAllPeople() {
    return this.http.get(`${environment.apiUrl}people/`)
    .pipe(map((ele: any) => {
        ele.results.map((e: any, index: number) => {
          e._id = (1 - 1) * 10 + (index + 1);
          return e;
        });
        return ele;
      }))
  }

  getNextPage(page: number) {
    return this.http.get(`${environment.apiUrl}people/?page=${page}`)
      .pipe(map((ele: any) => {
        ele.results.map((e: any, index: number) => {
          e._id = (page - 1) * 10 + (index + 1);
          return e;
        });
        return ele;
      }))
  }
}


