import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  mostrar = false;

  constructor() { }

  public show() {
    this.mostrar = true;
  }

  public hide() {
    this.mostrar = false;
  }
}
