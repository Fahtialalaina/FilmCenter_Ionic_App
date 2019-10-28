import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum SearchType {
    all='',
    movie='',
    series='',
    episode='episode',
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  url='http://www.omdbapi.com';
  apikey='88f64ddd';

  constructor(private http: HttpClient) { }

  searchData(title, type): Observable<any>{
    return this.http.get(`${this.url}?s=${encodeURI(title)}&type=${type}&apikey=${this.apikey}`)
    .pipe(
      map(results => {
        console.log('RAW: ', results);
        return results['Search'];
      })
    );
  }
  
  getDetails(id){
    return this.http.get(`${this.url}?i=${id}&plot=full&apikey=${this.apikey}`);
  }
}
