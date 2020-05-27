import { LiveRatesDTO } from './../server-side-dtos/live-rates-dto';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { RatesService } from '../services/rates.service';
import { Subject } from 'rxjs';
import { SignalRService } from '../services/signal-r.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-market-changes',
  templateUrl: './market-changes.component.html',
  styleUrls: ['./market-changes.component.scss']
})
export class MarketChangesComponent implements OnInit {

  liveRates: LiveRatesDTO[] = [];
  datasource: MatTableDataSource<LiveRatesDTO>;
  displayedColumns = ['Currency', 'Rate', 'Bid', 'Ask', 'High', 'Low', 'Open', 'Close', 'Timestamp'];
  constructor(
    private ratesService: RatesService,
    public signalRService: SignalRService,
    private http: HttpClient
   ) {

   }

   ngOnInit() {

    this.signalRService.startConnection();
    this.signalRService.addTransferRatesDataListener();
    this.liveRates = this.signalRService.data;
    this.datasource = new MatTableDataSource<LiveRatesDTO>(this.signalRService.data);
    this.startHttpRequest();
  }

  private startHttpRequest = () => {
    this.http.get('https://localhost:8096/api/rates')
      .subscribe((x: LiveRatesDTO[]) => {
        console.log(x);
      });
  }

}
