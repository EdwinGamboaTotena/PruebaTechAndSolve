import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecordsComponent } from './feature/mudanza/records/records.component';
import { ExecuteComponent } from './feature/mudanza/execute/execute.component';


const routes: Routes = [
  { path: 'dashboard', component: RecordsComponent },
  { path: 'ejecucion', component: ExecuteComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
