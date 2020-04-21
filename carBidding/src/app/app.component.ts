import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { OnlineOfflineService } from './online-offline.service';
import { RestApiService } from './rest-api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  showSnackBar:Boolean=false;
  
  readonly VAPID_PUBLIC_KEY = "BLzVD3cpcRqBYbujq25JR_J5EbHkL_7PM_BHN7AlqOomchns1Oq5gyO0875hCnNw1fQ-cLSXoGZQqFoz9WtOMZs";

  isEnabled = this.swPush.isEnabled;
  constructor(private readonly onlineOfflineService: OnlineOfflineService,private swPush: SwPush,private _restAPI:RestApiService) {
    this.registerToEvents(onlineOfflineService);
    this.subscribeToNotifications();
  }
    /*****Subscribe to notifications once once allow */
  subscribeToNotifications() {

    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => 
        this._restAPI.addPushSubscriber(sub).subscribe()
      )
     .catch(err => console.error("Could not subscribe to notifications", err));
}
 
/*****Check user online offline status */
  private registerToEvents(onlineOfflineService: OnlineOfflineService) {
    onlineOfflineService.connectionChanged.subscribe(online => {
      if (online) {
        console.log('Connected');
        
      } else {
        this.showSnackBar = true;
        setTimeout(() => {
          this.showSnackBar = false;
         }, 4000);
        
      }
    });
  }
  /****Send Notification broadcast */
  sendNotification(){
    this._restAPI.send().subscribe();
  }

    

 
}



