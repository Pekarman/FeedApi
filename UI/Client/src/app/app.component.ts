import { Component, Input } from '@angular/core';
import { ArticleHttpService } from './services/article.http.service';
import { SharedService } from './services/shared.service';
import { LocalizationService } from './localization/localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ArticleHttpService]
})
export class AppComponent {  

  constructor(
    private localizationService: LocalizationService
    ){}

  ngOnInit(): void {
    this.localizationService.initiate('ru-RU');
  }
}