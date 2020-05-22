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
    // this.ratesService.getLiveRates().subscribe((x: LiveRatesDTO[]) => {
    //   // tslint:disable-next-line:prefer-for-of
    //   for (let i = 0; i < x.length; i++) {
    //     const p: LiveRatesDTO = {
    //       currency: x[i].currency,
    //       rate: x[i].rate,
    //       bid: x[i].bid,
    //       ask: x[i].ask,
    //       high: x[i].high,
    //       low: x[i].low,
    //       open: x[i].open,
    //       close: x[i].close,
    //       timestamp: x[i].timestamp
    //     };
    //     this.liveRates.push(p);
    //   }
    //   this.datasource = new MatTableDataSource<LiveRatesDTO>(this.liveRates);
    // });

    this.signalRService.startConnection();
    this.signalRService.addTransferRatesDataListener();
    this.liveRates = this.signalRService.data;
    this.datasource = new MatTableDataSource<LiveRatesDTO>(this.signalRService.data);
    this.startHttpRequest();
  }

  private startHttpRequest = () => {
    this.http.get('https://localhost:32788/api/rates')
      .subscribe((x: LiveRatesDTO[]) => {
        console.log(x);
      });
  }

}
