import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getLatestNews() {
    const subject = new Subject();
    this.http.get('https://newsapi.org/v2/everything?q=F1&apiKey=ca1a2effdb7847fba7361032f29ade28&language=es&pageSize=7&domains=marca.com')
      .subscribe((res: any) => subject.next(res.articles));
    return subject.asObservable();

  }
}
