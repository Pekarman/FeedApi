import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  
  public isLoading: boolean = false;

  constructor() { }

  public wrap<T>(observable: Observable<T>): Observable<T> {
    this.show();
    return observable.pipe(finalize(() => {
      this.hide();
    }));
  }

  public show() {
    this.isLoading = true;
  }

  public hide() {
    this.isLoading = false;
  }
}