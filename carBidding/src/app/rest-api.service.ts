import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

export interface element {
  title: string;
  image: string;
  reservePrice: string;
  currentBid: string;
  currentBidder: string;
  auctionId: string;
  bidExpiry: string;

}

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  api: string = "http://demo2383658.mockable.io/getCars";

  constructor(private http: HttpClient) { }

  getCarDetails(): Observable<element[]> {
    return this.http.get<element[]>(this.api)
  }
}
