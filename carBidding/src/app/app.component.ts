import { Component } from '@angular/core';
import { OnlineOfflineService } from './online-offline.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Car Details';
  showSnackBar:Boolean=false;
  showSnackBaGreen:Boolean=false;
  

  constructor(private readonly onlineOfflineService: OnlineOfflineService) {
    this.registerToEvents(onlineOfflineService);
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
 
}



