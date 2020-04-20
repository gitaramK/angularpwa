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

export interface updateElement {
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  api: string = "https://demo2383658.mockable.io/getCars";
  updateBidAPI: string = "https://demo2383658.mockable.io/updateBid";

  constructor(private http: HttpClient) { }

  getCarDetails(): Observable<element[]> {
    return this.http.get<element[]>(this.api)
  }
  updateBid(value): Observable<updateElement[]> {
    return this.http.post<updateElement[]>(this.updateBidAPI,value);
  }

  addPushSubscriber(sub:any) {
    return this.http.post('/api/notifications', sub);
}

   send() {
    return this.http.post('/api/newsletter', null);
   }


  
}
