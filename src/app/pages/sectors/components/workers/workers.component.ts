import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent {

  @Output() readOE = new EventEmitter()

  reload(){
    this.readOE.emit();
  }

}
