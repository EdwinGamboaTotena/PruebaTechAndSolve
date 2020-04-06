import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderInterceptorService } from './services/loader-interceptor.service';
import { CoreModule } from './core/core.module';
import { MudanzaModule } from './feature/mudanza/mudanza.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    MudanzaModule
  ],
  exports: [
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: LoaderInterceptorService,
        multi: true
      }
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
