import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  articles: any[];

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getLatestNews()
      .subscribe((articles: any) => {
        this.articles = articles;
        console.log(this.articles);
      });
  }

}
