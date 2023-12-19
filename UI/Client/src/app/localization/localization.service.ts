import {Injectable} from '@angular/core';
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

  constructor() {}

  initiate(locale: string) {
    switch (locale) {
      case "ru-RU" : {
        this.locale = localeRu;
        break;
      }
      case "en-EN" : {
        this.locale = localeEn;
        break;
      }
      case undefined : {
        this.locale = localeEn;
        break;
      }
    }
    localStorage.setItem('selectedLanguage', locale);
  }



  translate(input: string, args: any): string {
    if (!this.locale?.Pages) this.initiate(this.locale as unknown as string);
    var item = this.locale;
    var keys = input.split('/');
    keys.forEach(key => {
      item = item[key];
    });

    if (args?.length > 0) {
      args.forEach((arg: string) => {
        var replaceItem = this.translate(arg, null);
        item = (item as string).replace(/{(\d+)}/g, replaceItem);
      });
    }

    return item;
  }
}
