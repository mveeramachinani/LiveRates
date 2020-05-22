import { SignalRService } from './services/signal-r.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarketChangesComponent } from './market-changes/market-changes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// tslint:disable-next-line:max-line-length
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { RatesService } from './services/rates.service';

@NgModule({
  declarations: [
    AppComponent,
    MarketChangesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    HttpClientModule,
    MatDialogModule,
    MatCardModule
  ],
  providers: [RatesService, SignalRService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {

}}
