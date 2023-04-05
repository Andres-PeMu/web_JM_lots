import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-string-modal',
  templateUrl: './string-modal.component.html',
  styleUrls: ['./string-modal.component.scss']
})
export class StringModalComponent {

  @Input() modalString: string = 'mensaje';
  @Input() seeModal: boolean = false;
  @Output() closeMode = new EventEmitter()

  closeModal() {
    this.closeMode.emit();
  }

}
