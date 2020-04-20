import { Component } from '@angular/core';
import { OnlineOfflineService } from './online-offline.service';
import { SwPush } from '@angular/service-worker';
import { RestApiService } from './rest-api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Car Details';
  showSnackBar:Boolean=false;
  showSnackBaGreen:Boolean=false;
  readonly VAPID_PUBLIC_KEY = "BLzVD3cpcRqBYbujq25JR_J5EbHkL_7PM_BHN7AlqOomchns1Oq5gyO0875hCnNw1fQ-cLSXoGZQqFoz9WtOMZs";


  constructor(private readonly onlineOfflineService: OnlineOfflineService,private swPush: SwPush,private _restAPI:RestApiService) {
    this.registerToEvents(onlineOfflineService);
    this.subscribeToNotifications();
  }

  subscribeToNotifications() {

    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => 
        this._restAPI.addPushSubscriber(sub).subscribe()
      )
     .catch(err => console.error("Could not subscribe to notifications", err));
}
 
  private registerToEvents(onlineOfflineService: OnlineOfflineService) {
    onlineOfflineService.connectionChanged.subscribe(online => {
      if (online) {
        console.log('Connected');
        //this.sendItemsFromIndexedDb();
  
      } else {
        this.showSnackBar = true;
        setTimeout(() => {
          this.showSnackBar = false;
         }, 4000);
        
      }
    });
  }

  sendNotification(){
    this._restAPI.send().subscribe();
  }

    

 
}



