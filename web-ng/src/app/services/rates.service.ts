import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LiveRatesDTO } from '../server-side-dtos/live-rates-dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatesService {

  private readonly apiBasePath: string;

  constructor(
    private readonly http: HttpClient
  ) {
    this.apiBasePath = environment.api_basepath;
  }

  getLiveRates(): Observable<LiveRatesDTO[]> {
    const url = this.apiBasePath + 'api/marketchanges';
    return this.http.get<LiveRatesDTO[]>(url);
  }

}
