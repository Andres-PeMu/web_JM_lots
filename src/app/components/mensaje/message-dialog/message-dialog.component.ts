import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit, OnDestroy {
  private timerSubscription: Subscription | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string, action: 'success' | 'error' | 'warning' },
    private dialogRef: MatDialogRef<MessageDialogComponent>
  ) { }

  ngOnInit(): void {
    this.timerSubscription = interval(5000)
      .pipe(take(1))
      .subscribe(() => {
        this.closeDialog();
      });
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  getTitle(): string {
    switch (this.data.action) {
      case 'success':
        return 'Éxito';
      case 'error':
        return 'Error';
      case 'warning':
        return 'Advertencia';
      default:
        return '';
    }
  }

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

  closeDialog(): void {
    this.dialogRef.close();
  }
}
