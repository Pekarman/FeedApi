import { Injectable } from '@angular/core';
import localeRu from './locale/ru-RU.json';
import localeEn from './locale/en-EN.json';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {  

  locales: any = [
    localeRu,
    localeEn
  ]

  locale!: any;

  constructor() {
    this.locales = [
      localeRu,
      localeEn
    ]
  }

  initiate(locale: string){
    switch (locale) {
      case "ru-RU" : { 
        this.locale = localeRu;
        break;
      }
      case "en-EN" : { 
        this.locale = localeEn;
        break;
      }
      defalt : { 
        this.locale = this.locales[0];
        break;
      }
    }
  }

  translate(input : string, args: any): string {
    var item = this.locale;
    var keys = input.split('/');
    keys.forEach(key => {
      item = item[key];
    });
    
    return item;
  }
}
