import { Injectable, EventEmitter } from '@angular/core';

import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertsService {

  clickConfirm: EventEmitter<void>;
  clickCancel: EventEmitter<void>;

  iniciarObservablesConfirm() {
    this.clickConfirm = new EventEmitter();
    this.clickCancel = new EventEmitter();
  }

  confirm(
    title = '',
    text = '',
    icon = 'warning',
    confirmButtonText = '',
    cancelButtonText = '',
    { clickConfirm = () => { }, clickCancel = () => { } } = {}
  ) {
    this.iniciarObservablesConfirm();
    return Swal.fire({
      title,
      text,
      icon: icon as SweetAlertIcon,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText
    }).then(result => {
      if (result.value) {
        this.clickConfirm.subscribe(() => clickConfirm());
        this.clickConfirm.emit();
        this.clickConfirm.unsubscribe();
      } else {
        this.clickCancel.subscribe(() => clickCancel());
        this.clickCancel.emit();
        this.clickCancel.unsubscribe();
      }
    });
  }

  popUp(titulo: string, mensaje: string, tipo: SweetAlertIcon) {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: tipo
    });
  }

  popUpHtml(titulo: string, mensaje: string, tipo: SweetAlertIcon) {
    Swal.fire({
      title: titulo,
      html: mensaje,
      icon: tipo
    });
  }

}
