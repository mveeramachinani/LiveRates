import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketChangesComponent } from './market-changes/market-changes.component';

const routes: Routes = [
  {
    path: '',
    component: MarketChangesComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
