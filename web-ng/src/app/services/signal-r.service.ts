import { LiveRatesDTO } from './../server-side-dtos/live-rates-dto';
import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public data: LiveRatesDTO[];

  private hubConnection: signalR.HubConnection;
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('https://localhost:32788/rates')
                            .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public addTransferRatesDataListener = () => {
    this.hubConnection.on('transferRatesData', (data) => {
      this.data = data;
      console.log(data);
    });
  }
}
