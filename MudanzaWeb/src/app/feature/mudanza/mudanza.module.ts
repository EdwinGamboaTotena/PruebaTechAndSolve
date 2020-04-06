import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from '../../app-routing.module';
import { RecordsComponent } from './records/records.component';
import { ExecuteComponent } from './execute/execute.component';

@NgModule({
    declarations: [
        RecordsComponent,
        ExecuteComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
    ],
    providers: [],
})
export class MudanzaModule { }
