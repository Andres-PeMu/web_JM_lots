import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {
  @Output() readOE = new EventEmitter()

  reload() {
    this.readOE.emit();
  }
}
