import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MudanzaService } from './mudanza.service';
import { apiExecute } from '../config/endPoints';
import { Execute } from '../models/Execute';

describe('MudanzaService', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let service: MudanzaService;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [MudanzaService],
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(MudanzaService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('findAll', () => {
    // Arrange
    service.findAll().subscribe((respuesta) => {
      expect(respuesta).toBeDefined();
    });
    // Act
    const peticion = httpMock.expectOne(`${apiExecute}`);
    // Assert
    expect(peticion.request.method).toBe('GET');
  });

  it('saveExecute', () => {
    // Arrange
    const datos = new Execute('123', '001');
    service.saveExecute(datos).subscribe((respuesta) => {
      expect(respuesta).toBeDefined();
    });
    // Act
    const peticion = httpMock.expectOne(`${apiExecute}`);
    expect(peticion.request.method).toBe('POST');
  });

  it('calculateOutput', () => {
    // Arrange
    const id = 0;
    service.calculateOutput(id).subscribe((respuesta) => {
      expect(respuesta).toBeDefined();
    });
    // Act
    const peticion = httpMock.expectOne(`${apiExecute}/${id}`);
    // Assert
    expect(peticion.request.method).toBe('GET');
  });
});
