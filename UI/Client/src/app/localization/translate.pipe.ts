import { Pipe, PipeTransform } from '@angular/core';
import { LocalizationService } from './localization.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  
  constructor(private localizationService: LocalizationService) { }

  transform(value: string, ...args: unknown[]): string {
    return this.localizationService.translate(value, args);
  }
}
