import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SweetAlertsService } from '../../../services/sweet-alerts.service';
import { ErroresService } from '../../../services/errores.service';
import { Execute } from '../../../models/Execute';
import { MudanzaService } from '../../../services/mudanza.service';
import { timestamp } from 'rxjs/operators';

@Component({
  selector: 'app-execute',
  templateUrl: './execute.component.html',
  styles: []
})
export class ExecuteComponent implements OnInit {

  formExecute: FormGroup;
  inputString: string;
  constructor(
    private sweet: SweetAlertsService,
    private router: Router,
    public erroresService: ErroresService,
    private mudanzaService: MudanzaService
  ) { }

  ngOnInit(): void {
    this.formExecute = new FormGroup({
      document: new FormControl('', [Validators.required, Validators.minLength(5)]),
      input: new FormControl(''),
    });
    this.formExecute.get('input').setValidators([
      Validators.required,
      this.validateExtent.bind(this.formExecute)
    ]);
    this.inputString = '';
  }

  validateExtent(Control: FormControl): { [s: string]: boolean } {
    let type: string = Control.value;
    type = (type.substring(type.lastIndexOf('.'))).toLowerCase();
    if (type !== '.txt') {
      return {
        typeNoValid: true
      };
    }
    return null;
  }

  registrerExecution() {
    if (this.formExecute.valid) {
      const execute: Execute = new Execute(this.formExecute.value.document, this.inputString);
      this.mudanzaService.saveExecute(execute).subscribe(response => {
        this.dowloadOutput(response.output, response.execute.id);
        this.router.navigate(['/dashboard']);
      }, error => {
        this.erroresService.erroresHttp(error);
      });
    } else {
      this.sweet.popUp('Error', 'Valide los campos del formulario', 'error');
    }
  }

  readInput(e) {
    if (this.formExecute.get('input').valid) {
      const file = e.target.files[0];
      if (!file) {
        return;
      }
      const reader = new FileReader();
      reader.onload = (Event) => {
        const contenido = Event.target.result;
        this.inputString = String(contenido);
      };
      reader.readAsText(file);
    }
  }

  dowloadOutput(output: string, id: number) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(output));
    element.setAttribute('download', 'output-' + id + '.txt');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

}
