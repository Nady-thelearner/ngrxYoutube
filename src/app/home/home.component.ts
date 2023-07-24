import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from '../service/news.service';
import { Router } from '@angular/router';

import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  articles: any[];

  private refreshSubscription: Subscription;
  constructor(
    private NewsSF: NewsService,
    private router: Router,

  ) {
    this.refreshComponent();
  }

  ngOnInit(): void {
    this.NewsSF.getNews().subscribe((res) => (this.articles = res));
  }

  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      console.log("Destroy called...")
      this.refreshSubscription.unsubscribe();
    }
  }

  refreshComponent(): void {
    const intervalTime =60000; // Refresh interval in milliseconds (e.g., every 5 seconds)
    console.log('refreshed');
    this.refreshSubscription = interval(intervalTime).subscribe(() => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.navigateByUrl(this.router.url).then(() => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
    });
  }
}
