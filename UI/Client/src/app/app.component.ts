import {Component, OnInit} from '@angular/core';
import {ArticleHttpService} from './services/article.http.service';
import {LocalizationService} from './localization/localization.service';
import { SpinnerService } from './modules/spinner/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ArticleHttpService]
})
export class AppComponent implements OnInit {

  constructor(
    private localizationService: LocalizationService,
    public spinnerService: SpinnerService
  ) {
  }

  ngOnInit(): void {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    this.localizationService.initiate(savedLanguage as string);
  }
}
