import { Component, OnInit } from '@angular/core';
import { ErroresService } from 'src/app/shared/services/errores.service';
import { SweetAlertsService } from 'src/app/shared/services/sweet-alerts.service';
import { MudanzaService } from 'src/app/shared/services/mudanza.service';
import { Execute } from 'src/app/shared/models/Execute';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styles: [],
})
export class RecordsComponent implements OnInit {
  lstExecutions: Execute[];
  constructor(
    private erroresService: ErroresService,
    private sweetAlertsService: SweetAlertsService,
    private mudanzaService: MudanzaService
  ) {}

  ngOnInit(): void {
    this.lstExecutions = [];
    this.findExecutions();
  }

  findExecutions() {
    this.mudanzaService.findAll().subscribe(
      (data) => {
        this.lstExecutions = data;
      },
      (error) => {
        this.erroresService.erroresHttp(error);
      }
    );
  }

  showInput(input: string) {
    const mensaje = `
    <textarea rows="5" cols="50">
    ${input}
    </textarea>`;
    this.sweetAlertsService.popUpHtml('Entrada: ', mensaje, 'info');
  }

  generateOutput(id: number) {
    this.mudanzaService.calculateOutput(id).subscribe(
      (response) => {
        this.dowloadOutput(response.output, response.execute.id);
      },
      (error) => {
        this.erroresService.erroresHttp(error);
      }
    );
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
