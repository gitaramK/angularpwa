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
  
  constructor(private http: HttpClient) { }

  getCarDetails(): Observable<element[]> {
    return this.http.get<element[]>('/api/getcar');
  }
  updateBid(data): Observable<updateElement[]> {
    return this.http.post<updateElement[]>('/api/updateBid',data);
  }

  addPushSubscriber(sub:any) {
    return this.http.post('/api/notifications', sub);
}

   send() {
    return this.http.post('/api/newsletter', null);
   }


  
}
