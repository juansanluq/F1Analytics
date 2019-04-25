import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  currentDate = new Date();

  constructor(private http: HttpClient) { }

  getLatestNews() {
    const toDate = this.currentDate.toISOString().split('T')[0];
    const fromDateNumber = this.currentDate.getDate() - 7;
    let fromDate = new Date();
    fromDate.setDate(fromDateNumber);
    const fromDateFormated = fromDate.toISOString().split('T')[0];
    const subject = new Subject();
    this.http.get(`https://newsapi.org/v2/everything?q=F1&apiKey=ca1a2effdb7847fba7361032f29ade28&language=es&pageSize=7&domains=marca.com&from=${fromDateFormated}&to=${toDate}`)
      .subscribe((res: any) => subject.next(res.articles));
    return subject.asObservable();
  }
}
