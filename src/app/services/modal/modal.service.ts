import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/components/mensaje/message-dialog/message-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  showMessage(message: string, action: 'success' | 'error' | 'warning'): void {
    this.dialog.open(MessageDialogComponent, {
      data: { message, action },
      width: '300px'
    });
  }
}
