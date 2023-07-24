import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getNews(): Observable<any> {
    const url = 'http://localhost:8000/news';
    // const url = 'https://backendnews-84684.web.app';

    return this.http.get(url);
  }
}
