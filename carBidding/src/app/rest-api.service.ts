/***
 * Author : Gitaram Kanawade
 * Date : 21/04/2020
 * Description:Call all rest APIS
 */
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
  
  constructor(private http: HttpClient) { }

  getCarDetails(): Observable<element[]> {
    return this.http.get<element[]>('/api/getcar');
  }
  
  updateBid(sub:any) {
    return this.http.post('/api/updateBid', sub);
  }
   
  addPushSubscriber(sub:any) {
    return this.http.post('/api/notifications', sub);
}

   send() {
    return this.http.post('/api/newsletter', null);
   }


  
}
