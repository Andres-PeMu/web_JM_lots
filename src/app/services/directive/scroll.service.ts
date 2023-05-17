import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private position = 0;

  setPosition(position: number) {
    this.position = position;
    console.log(this.position)
  }

  getPosition(): number {
    return this.position;
  }
}
