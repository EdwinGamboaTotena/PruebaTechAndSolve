import { RecordsComponent } from './records.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MudanzaService } from 'src/app/shared/services/mudanza.service';
import { of, throwError } from 'rxjs';
import { ErroresService } from '../../../shared/services/errores.service';
import { SweetAlertsService } from '../../../shared/services/sweet-alerts.service';
import { Execute } from '../../../shared/models/Execute';

describe('RecordsComponent', () => {
  let component: RecordsComponent;
  let fixture: ComponentFixture<RecordsComponent>;
  let router: Router;
  let mudanzaService: MudanzaService;
  let erroresService: ErroresService;
  let sweetAlertsService: SweetAlertsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecordsComponent],
      imports: [CoreModule, RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();

    router = TestBed.inject(Router);
    mudanzaService = TestBed.inject(MudanzaService);
    erroresService = TestBed.inject(ErroresService);
    sweetAlertsService = TestBed.inject(SweetAlertsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('findExecutions => Debería invocar el servicio findAll', () => {
    // Arrange
    spyOn(mudanzaService, 'findAll').and.returnValue(of([new Execute('123', '')]));
    // Act
    component.findExecutions();
    // Assert
    expect(component.lstExecutions[0].document).toBe('123');
  });

  it('findExecutions => Debería invocar el servicio erroresHttp', () => {
    // Arrange
    const spyErroresService = spyOn(erroresService, 'erroresHttp');
    spyOn(mudanzaService, 'findAll').and.returnValue(
      throwError({ status: 500, error: { error: { errors: 'Ocurrio un error' } } })
    );
    // Act
    component.findExecutions();
    // Assert
    expect(spyErroresService).toHaveBeenCalled();
  });

  it('showInput => Debería mostrar popup', () => {
    // Arrange
    const spySweetAlertsService = spyOn(sweetAlertsService, 'popUpHtml');
    // - Act
    component.showInput('');
    // Assert
    expect(spySweetAlertsService).toHaveBeenCalled();
  });

  it('generateOutput => Debería invocar el servicio dowloadOutput', () => {
    // Arrange
    const spyDowloadOutput = spyOn(component, 'dowloadOutput');
    spyOn(mudanzaService, 'calculateOutput').and.returnValue(of({ output: '', execute: { id: 0 } }));
    // Act
    component.generateOutput(0);
    // Assert
    expect(spyDowloadOutput).toHaveBeenCalled();
  });

  it('generateOutput => Debería invocar el servicio erroresHttp', () => {
    // Arrange
    const spyErroresService = spyOn(erroresService, 'erroresHttp');
    spyOn(mudanzaService, 'calculateOutput').and.returnValue(
      throwError({ status: 500, error: { error: { errors: 'Ocurrio un error' } } })
    );
    // Act
    component.generateOutput(0);
    // Assert
    expect(spyErroresService).toHaveBeenCalled();
  });
});
