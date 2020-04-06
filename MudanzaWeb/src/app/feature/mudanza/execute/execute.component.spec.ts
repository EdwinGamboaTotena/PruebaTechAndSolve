import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MudanzaService } from 'src/app/shared/services/mudanza.service';
import { of, throwError } from 'rxjs';
import { ErroresService } from '../../../shared/services/errores.service';
import { SweetAlertsService } from '../../../shared/services/sweet-alerts.service';
import { ExecuteComponent } from './execute.component';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ExecuteComponent', () => {
  let component: ExecuteComponent;
  let fixture: ComponentFixture<ExecuteComponent>;
  let router: Router;
  let mudanzaService: MudanzaService;
  let erroresService: ErroresService;
  let sweetAlertsService: SweetAlertsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExecuteComponent],
      imports: [CoreModule, RouterTestingModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule],
    }).compileComponents();

    router = TestBed.inject(Router);
    mudanzaService = TestBed.inject(MudanzaService);
    erroresService = TestBed.inject(ErroresService);
    sweetAlertsService = TestBed.inject(SweetAlertsService);
    spyOn(router, 'navigate').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecuteComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('validateExtent => Debería retornar objeto', () => {
    // Arrange
    const control = new FormControl('');
    // Act
    const respuesta = component.validateExtent(control);
    // Assert
    expect(respuesta.typeNoValid).toBeTrue();
  });

  it('validateExtent => Debería retornar null', () => {
    // Arrange
    const control = new FormControl('.txt');
    // Act
    const respuesta = component.validateExtent(control);
    // Assert
    expect(respuesta).toBeNull();
  });

  it('registrerExecution => Debería invocar a dowloadOutput', () => {
    // Arrange
    const spyDowloadOutput = spyOn(component, 'dowloadOutput');
    component.formExecute = new FormGroup({ documento: new FormControl('') });

    spyOn(mudanzaService, 'saveExecute').and.returnValue(of({ output: '', execute: { id: 0 } }));
    // Act
    component.registrerExecution();
    // Assert
    expect(spyDowloadOutput).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
  });

  it('registrerExecution => Debería invocar el servicio de errores', () => {
    // Arrange
    component.formExecute = new FormGroup({ documento: new FormControl('') });
    const spyErroresService = spyOn(erroresService, 'erroresHttp');

    spyOn(mudanzaService, 'saveExecute').and.returnValue(
      throwError({ status: 500, error: { error: { errors: 'Ocurrio un error' } } })
    );
    // Act
    component.registrerExecution();
    // Assert
    expect(spyErroresService).toHaveBeenCalled();
  });

  it('registrerExecution => Debería mostrar popup', () => {
    // Arrange
    const spyPopup = spyOn(sweetAlertsService, 'popUp');
    // Act
    component.registrerExecution();
    // Assert
    expect(spyPopup).toHaveBeenCalled();
  });
});
