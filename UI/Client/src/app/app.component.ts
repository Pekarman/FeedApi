import {Component, OnInit} from '@angular/core';
import {ArticleHttpService} from './services/article.http.service';
import {LocalizationService} from './localization/localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ArticleHttpService]
})
export class AppComponent implements OnInit {

  constructor(
    private localizationService: LocalizationService
  ) {
  }

  ngOnInit(): void {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    this.localizationService.initiate(savedLanguage as string);
  }
}
