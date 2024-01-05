import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  template: `
    <div>
      <mat-icon [style.color]="getColor()">{{ getIcon() }}</mat-icon>
      <p>{{ data.message }}</p>
    </div>
  `,
  styles: [
    `
      div {
        display: flex;
        align-items: center;
      }
      mat-icon {
        margin-right: 10px;
      }
    `
  ]
})
export class MessageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string, action: 'success' | 'error' | 'warning' }) { }

  getIcon(): string {
    switch (this.data.action) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'cancel';
      case 'warning':
        return 'warning';
      default:
        return '';
    }
  }

  getColor(): string {
    switch (this.data.action) {
      case 'success':
        return 'green';
      case 'error':
        return 'red';
      case 'warning':
        return 'orange';
      default:
        return '';
    }
  }
}
