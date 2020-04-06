import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { SweetAlertsService } from './sweet-alerts.service';

@Injectable({
  providedIn: 'root'
})
export class ErroresService {
  constructor(private sweet: SweetAlertsService) { }

  errores(formulario: FormGroup, nombreControl: string, ngForm?: any) {
    const errores = formulario.get(nombreControl).errors;
    return {
      hayErrores:
        (!!errores && formulario.get(nombreControl).dirty) || (isNullOrUndefined(ngForm) ? false : (!!errores && ngForm.submitted)),
      errores
    };
  }

  erroresHttp(error: any) {
    if (error.status === 0) {
      this.sweet.popUp('Oops...', 'Parece que no tenemos conexión con el servidor, intentalo más tarde', 'error');
    } else {
      this.sweet.popUp('Oops...', error.error.errors, 'error');
    }
  }
}
