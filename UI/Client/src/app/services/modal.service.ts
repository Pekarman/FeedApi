import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private dialog: MatDialog) {}

  openModal(component: ComponentType<any>, data?: any) {
    this.dialog.open(component, {
      data: data,
      width: '500px',
      height: 'auto',
      panelClass: 'my-dialog',
    });
  }
}